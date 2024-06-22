const express = require('express');
const todos = require('../controllers/todos');
const router = express.Router();

router.get('/', todos.getTodos);
router.post('/', todos.createTodos);
router.put('/:id', todos.updateTodos);
router.delete('/:id', todos.deleteTodos);
router.get('/:id', todos.getTodo);

module.exports = router