// routes/todos.js
const router = require('express').Router();
const Todos = require('../models/todos');

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve a list of all todos
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', async (req, res) => {
    try {
        const todos = await Todos.find();
        res.json(todos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get single todo
 *     description: Retrieve a single todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Successfully retrieved todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todos.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        res.status(500).send('Server Error');
    }
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Add new todo
 *     description: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Successfully created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        const newTodo = new Todos({
            title,
            description,
        });
        const todo = await newTodo.save();
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update todo
 *     description: Update an existing todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       200:
 *         description: Successfully updated todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        const todo = await Todos.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        todo.title = title;
        todo.description = description;
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete todo
 *     description: Delete a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Successfully deleted todo
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todos.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        await todo.remove();
        res.json({ msg: 'Todo removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
