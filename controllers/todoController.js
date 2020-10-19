const Todo = require("../models/todoModel");

//* @desc Create New Todo
//* @route POST /api/v1/todos
//* @access Public
async function createTodo(req, res, next) {
	try {
		//? Add user to req.body
		req.body.user = req.user.id;

		res.status(201);
		const { text, title } = req.body;
		const todo = await Todo.create(req.body);
		res.json({
			status: "success",
			data: {
				todo,
			},
		});
	} catch (error) {
		if ((error.name = "ValidationError")) {
			const messages = Object.values(error.errors).map(val => val.message);
			res.status(400);
			res.json({
				status: "failed",
				error: messages,
			});
		} else {
			res.status(500).json({
				status: "failed",
				error: "Server Error",
			});
		}
	}
}

//* @desc Get all Todos
//* @route GET /api/v1/todos
//* @access Public
async function getTodos(req, res, next) {
	try {
		res.status(202);
		const todos = await Todo.find({ user: req.user.id });
		res.json({
			status: "success",
			count: todos.length,
			data: {
				todos,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: "failed",
			error: "Server Error",
		});
	}
}

//* @desc Get Todo by id
//* @route GET /api/v1/todos/:id
//* @access Public
async function findTodoById(req, res, next) {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			res.status(404);
			res.json({
				status: "failed",
				error: "No Todo Found",
			});
		}

		res.status(202);
		res.json({
			status: "success",
			data: {
				todo,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: "failed",
			error: "Server Error",
		});
	}
}

//* @desc Update Todo by ID
//* @route PUT /api/v1/todos/:id
//* @access Public
async function updateTodoById(req, res, next) {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			res.status(404);
			res.json({
				status: "failed",
				error: "No Todo Found",
			});
		}

		await Todo.findByIdAndUpdate(req.params.id, req.body);
		const updatedTodo = await Todo.findById(req.params.id);

		res.status(202);
		res.json({
			status: "success",
			data: {
				todo: updatedTodo,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: "failed",
			error: "Server Error",
		});
	}
}

//* @desc Delete Todo by ID
//* @route DELETE /api/v1/todos/:id
//* @access Public
async function deleteTodoById(req, res, next) {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			res.status(404);
			res.json({
				status: "failed",
				error: "No Todo Found",
			});
		}

		await todo.remove();

		res.status(204);
		res.json({
			status: "success",
			data: {},
		});
	} catch (error) {
		return res.status(500).json({
			status: "failed",
			error: "Server Error",
		});
	}
}

module.exports = {
	createTodo,
	getTodos,
	findTodoById,
	updateTodoById,
	deleteTodoById,
};
