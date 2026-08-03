const bcrypt = require('bcrypt');
const hash = '$2b$10$amJcZlX8hAoVaRYHFyqpTOjWAMUfATIWMTc2.0A58D/ruvCaMJiYC';
bcrypt.compare('admin123', hash).then(res => console.log('Match admin123:', res));
bcrypt.compare('Coskinn@123', hash).then(res => console.log('Match Coskinn@123:', res));
bcrypt.compare('Admin@123', hash).then(res => console.log('Match Admin@123:', res));
