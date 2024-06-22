const Todos = require('../models/todos');
const db = require('../config/db');


const getTodos = async (req, res) => {
    try {
        const todos = await Todos.findAll();
        if (!todos) {
            return res.status(404).send({ message: 'Todos not found!' });
        }
        res.send(todos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createTodos = async (req, res) => {
    try {
        const todos = await Todos.create(req.body);
        res.send(todos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateTodos = async (req, res) => {
    try {
        const todos = await Todos.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        res.send(todos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteTodos = async (req, res) => {
    try {
        const todos = await Todos.destroy({
            where: { id: req.params.id }
        });
        res.send(todos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getTodo = async (req, res) => {
    try {
        const todos = await Todos.findOne({
            where: { id: req.params.id }
        });
        if (!todos) {
            return res.status(404).send({ message: 'Todo not found!' });
        }
        res.send(todos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getTodos,
    createTodos,
    updateTodos,
    deleteTodos,
    getTodo
}