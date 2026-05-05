async function main() {
  try {
    const loginRes = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@colegio.com',
        password: 'admin123'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.access_token;

    // Temporalmente añado el endpoint de nuevo para la limpieza del ID 3
    // Pero espera, el endpoint usa req.user.schoolId.
    // Si me logueo como admin@colegio.com, mi schoolId es 1.
    // Así que borraría el 1 de nuevo.
    // Necesito un endpoint que acepte el schoolId como parámetro o loguearme como admin de Gualberto.
  } catch (err) {
    console.error(err);
  }
}
