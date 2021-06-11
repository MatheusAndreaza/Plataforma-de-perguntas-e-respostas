const Sequelize = require('sequelize');
const connection = new Sequelize('teste_server', 'teste_server', 'matheus10', {
    host: 'mysql742.umbler.com',
    port: '41890',
    dialect: 'mysql'
});

module.exports = connection;