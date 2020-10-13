const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

dotenv.config({ path: "./config/config.env" });

mongoose.connect("mongodb://localhost/simple-demo", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const {
	getTodos,
	createTodo,
	findTodoById,
	updateTodoById,
	deleteTodoById,
} = require("./controllers/todoController");

const app = express();
const port = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());
//parses request body and populates request.body
// app.use(express.bodyParser());
//checks request.body for HTTP method overrides
// app.use(express.methodOverride());

app.get("/", (req, res) => {
	res.status(200);
	res.json("did this work");
});

app.get("/todos", async (req, res) => {
	res.status(202);
	const todos = await getTodos();
	res.json({
		status: "success",
		data: {
			todos,
		},
	});
});

app.get("/todos/:id", async (req, res) => {
	res.status(202);
	const todo = await findTodoById(req.params.id);
	const todoReturned = todo.toObject();
	res.json({
		status: "success",
		data: {
			todo: { id: todo.id, ...todoReturned },
		},
	});
});

app.post("/todos", async (req, res) => {
	res.status(201);
	const { text, title } = req.body;
	const todo = await createTodo({ text, title });
	const todoReturned = todo.toObject();
	res.json({
		status: "success",
		data: {
			todo: { id: todo.id, ...todoReturned },
		},
	});
});

app.put("/todos/:id", async (req, res) => {
	res.status(202);
	const todo = await updateTodoById(req.params.id, req.body);
	const todoReturned = todo.toObject();
	res.json({
		status: "success",
		data: {
			todo: { id: todo.id, ...todoReturned },
		},
	});
});

app.delete("/todos/:id", async (req, res) => {
	res.status(204);
	await deleteTodoById(req.params.id);
	res.json({
		status: "success",
		data: null,
		message: "Todo has been deleted successfully",
	});
});

app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
	);
});

module.exports = app;
