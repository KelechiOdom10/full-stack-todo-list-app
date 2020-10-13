const express = require("express");
const {
	getTodos,
	createTodo,
	updateTodoById,
	deleteTodoById,
	findTodoById,
} = require("../controllers/todoController");
const router = express.Router();

router.route("/").get(getTodos).post(createTodo);

router
	.route("/:id")
	.get(findTodoById)
	.put(updateTodoById)
	.delete(deleteTodoById);

module.exports = router;
