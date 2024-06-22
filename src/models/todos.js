const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Todos = db.define('todos', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    completed: {
        type: DataTypes.STRING
    } 
},{
    timestamps: true,
    table : 'todos'
});

module.exports = Todos  