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
    console.log('Token obtenido');

    const clearRes = await fetch('http://localhost:3000/students/maintenance/clear-all', {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    
    if (clearRes.ok) {
      const data = await clearRes.json();
      console.log('Limpieza completada:', data);
    } else {
      console.error('Fallo en la limpieza:', clearRes.status, await clearRes.text());
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
