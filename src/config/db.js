// Create sequelize instance
const Sequelize = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sync();

module.exports = db