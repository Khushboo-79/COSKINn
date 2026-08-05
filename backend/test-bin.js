const axios = require('axios');

async function test() {
  try {
    const login = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'admin@fairenne.com',
      password: 'admin123'
    });
    
    const token = login.data.access_token;
    console.log('Got token');
    
    try {
      const res = await axios.post('http://localhost:3000/api/warehouse/bins', {
        warehouseId: 'default-warehouse',
        code: 'TEST-01'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Success:', res.data);
    } catch (e) {
      console.log('Error:', e.response ? e.response.data : e.message);
    }
  } catch(e) {
    console.error('Login failed:', e.message);
  }
}

test();
