const router = require("express").Router();
const Todos = require("../models/todos");

// DESC @route GET api/todos
// DESC @desc Get all todos
// DESC @access Public
router.get("/", async (req, res) => {
    try {
        const todos = await Todos.find();
        res.json(todos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// DESC @route GET api/todos/:id
// DESC @desc Get single todo
// DESC @access Public
router.get("/:id", async (req, res) => {
    try {
        const todo = await Todos.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.status(500).send("Server Error");
    }
}); 

// DESC @route POST api/todos
// DESC @desc Add new todo
// DESC @access Public
router.post("/", async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }           
    try {
        const newTodo = new Todos({
            title,
            description
        });
        const todo = await newTodo.save();
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// DESC @route PUT api/todos/:id
// DESC @desc Update todo
// DESC @access Public
router.put("/:id", async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }           
    try {
        const todo = await Todos.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        todo.title = title;
        todo.description = description;
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}); 

// DESC @route DELETE api/todos/:id
// DESC @desc Delete todo
// DESC @access Public
router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todos.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        await todo.remove();
        res.json({ msg: "Todo removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;