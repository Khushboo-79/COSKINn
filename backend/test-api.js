const roleId = "8c3cc401-b2d1-45a8-9f14-514840d9b633"; // AUDITOR
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTI1NTNlNS0yYzE5LTQ2YTEtOWJlZS0zNWIxMzFhZjk2MWYiLCJlbWFpbCI6ImFkbWluQGNvc2tpbm4uY29tIiwicm9sZXMiOlsiU1VQRVJfQURNSU4iXSwiaWF0IjoxNzg1NzM0NzQ4fQ.n4ePiSRhBfiL1CpuV7TnD7i4SRf7ltVzKa7WBzJHDXQ";

fetch(`https://api.regpayai.com/api/admin/config/roles/${roleId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: "AUDITOR",
    panelAccess: ["audit"]
  })
}).then(res => {
  console.log("Status:", res.status);
  return res.text();
}).then(text => {
  console.log("Body:", text);
}).catch(console.error);
