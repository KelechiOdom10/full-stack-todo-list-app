const express = require("express");
const {
	getTodos,
	createTodo,
	updateTodoById,
	deleteTodoById,
	// findTodoById,
} = require("../controllers/todoController");
const router = express.Router();
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getTodos).post(protect, createTodo);

router
	.route("/:id")
	// .get(findTodoById)
	.put(protect, updateTodoById)
	.delete(protect, deleteTodoById);

module.exports = router;
