require('dotenv').config();
const app = require('./src/app');
const { initDB } = require('./src/config/database');

initDB().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
});