const { Client } = require('pg');

const LOCAL_URL = "postgresql://postgres:mario251985@localhost:5432/colegios?schema=public";
const REMOTE_URL = "postgresql://neondb_owner:npg_nIi0TERGB7cp@ep-purple-morning-akzx3op6.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require";

async function migrate() {
    const local = new Client({ connectionString: LOCAL_URL });
    const remote = new Client({ connectionString: REMOTE_URL });

    try {
        await local.connect();
        await remote.connect();
        console.log("🚀 Conectado. Limpiando nube...");

        const tables = [
            'School', 'User', 'Teacher', 'AcademicYear', 'Course', 
            'Subject', 'Student', 'Enrollment', 'SubjectAssignment', 
            'Evaluation', 'EvaluationScore', 'Grade', 'Attendance', 
            'DimensionScore', 'Event'
        ];

        for (const table of [...tables].reverse()) {
            await remote.query(`TRUNCATE TABLE "public"."${table}" CASCADE`);
        }
        
        console.log("✨ Nube limpia. Copiando datos (modo ultra rápido)...");

        for (const table of tables) {
            let res = await local.query(`SELECT * FROM "public"."${table}"`);
            if (res.rows.length === 0) {
                console.log(`ℹ️ Tabla ${table} está vacía.`);
                continue;
            }

            let dataToInsert = res.rows;

            // Si es Evaluation, eliminamos duplicados locales antes de enviar
            if (table === 'Evaluation') {
                const seen = new Set();
                dataToInsert = res.rows.filter(row => {
                    const key = `${row.title}-${row.subjectId}-${row.period}-${row.courseId}`;
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });
                // Guardamos los IDs válidos para las notas
                global.validEvaluationIds = new Set(dataToInsert.map(r => r.id));
                console.log(`🧹 Filtrados ${res.rows.length - dataToInsert.length} duplicados en Evaluation.`);
            }

            // Si es EvaluationScore, filtramos las que huérfanas
            if (table === 'EvaluationScore' && global.validEvaluationIds) {
                const originalCount = dataToInsert.length;
                dataToInsert = dataToInsert.filter(row => global.validEvaluationIds.has(row.evaluationId));
                console.log(`🧹 Filtradas ${originalCount - dataToInsert.length} notas huérfanas en EvaluationScore.`);
            }

            console.log(`📦 Insertando ${dataToInsert.length} registros en ${table}...`);
            
            // Procesamos en bloques de 100
            const chunkSize = 100;
            for (let i = 0; i < dataToInsert.length; i += chunkSize) {
                const chunk = dataToInsert.slice(i, i + chunkSize);
                const keys = Object.keys(chunk[0]);
                const columns = keys.map(k => `"${k}"`).join(', ');
                
                let valueIndex = 1;
                const values = [];
                const placeholders = chunk.map(row => {
                    const rowPlaceholders = keys.map(() => `$${valueIndex++}`).join(', ');
                    values.push(...keys.map(k => row[k]));
                    return `(${rowPlaceholders})`;
                }).join(', ');

                let conflictClause = `ON CONFLICT (id) DO UPDATE SET ${keys.map(k => `"${k}" = EXCLUDED."${k}"`).join(', ')}`;
                if (table === 'Evaluation') {
                    conflictClause = `ON CONFLICT (title, "subjectId", period, "courseId") DO UPDATE SET ${keys.map(k => `"${k}" = EXCLUDED."${k}"`).join(', ')}`;
                }

                const query = `INSERT INTO "public"."${table}" (${columns}) VALUES ${placeholders} ${conflictClause}`;
                await remote.query(query, values);
            }
            console.log(`✅ Tabla ${table} lista.`);
        }

        console.log("🎉 ¡MIGRACIÓN TOTAL COMPLETADA!");

    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await local.end();
        await remote.end();
    }
}

migrate();
