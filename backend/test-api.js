const http = require('http');

http.get('http://localhost:3000/api/support/admin/settings', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', data));
}).on('error', (err) => {
  console.log('Error:', err.message);
});
