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
    console.log('Token obtained');

    try {
      const createRes = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          rude: 'TEST-1777851312752',
          firstName: 'Duplicate',
          lastName: 'Student'
        })
      });
      const createData = await createRes.json();
      if (createRes.ok) {
        console.log('Student created:', createData);
      } else {
        console.error('Create failed:', createRes.status, createData);
      }
    } catch (err) {
      console.error('Create failed:', err.message);
    }
  } catch (err) {
    console.error('Login failed:', err.message);
  }
}

main();
