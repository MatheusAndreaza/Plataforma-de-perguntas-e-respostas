const Sequelize = require('sequelize');
const connection = new Sequelize('database', 'password', 'user', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

module.exports = connection;