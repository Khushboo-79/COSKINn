const bcrypt = require('bcrypt');
const hash = '$2b$10$amJcZlX8hAoVaRYHFyqpTOjWAMUfATIWMTc2.0A58D/ruvCaMJiYC';
bcrypt.compare('password', hash).then(res => console.log('Match:', res));
