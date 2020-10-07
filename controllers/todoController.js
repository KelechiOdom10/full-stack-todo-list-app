const Todo = require("../models/todoModel");

async function createTodo({ text, title }) {
	const todo = await Todo.create({ text, title });
	return todo;
}

async function getTodos() {
	const todos = await Todo.find({});
	return todos;
}

async function findTodoById(id) {
	const todo = await Todo.findById(id);
	return todo;
}

async function updateTodoById(id, updateDetails) {
	await Todo.findByIdAndUpdate(id, updateDetails);
	const updatedTodo = await Todo.findById(id);
	return updatedTodo;
}

async function deleteTodoById(id) {
	const todo = await Todo.findByIdAndDelete(id);
	return todo;
}

module.exports = {
	createTodo,
	getTodos,
	findTodoById,
	updateTodoById,
	deleteTodoById,
};
