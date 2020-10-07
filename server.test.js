const app = require("./server");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Todo = require("../models/todoModel");
const { getTodos, createTodo } = require("../controllers/todoController");
const { findById } = require("../models/todoModel");

const request = supertest(app);

mongoose.connect("mongodb://localhost/simple-demo", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

afterAll(async () => {
	// Closing the DB connection allows Jest to exit successfully.
	await Todo.deleteMany({});
	mongoose.connection.close();
});

describe("GET", () => {
	test("Sends back all the todo list items", async done => {
		await createTodo({ title: "Test ting", title: "No sir" });
		const response = await request.get("/todos");
		expect(response.status).toBe(202);
		expect(response.body.status).toBe("success");
		expect(response.body.data.todos).toHaveLength(1);
		done();
	});
});

describe("POST", () => {
	test("SHould create a new todo in the database", async done => {
		const todoBefore = await getTodos();

		const response = await request.post("/todos").send({
			title: "New Todo added",
			text: "Eat dinner!!",
		});

		const todoAfter = await getTodos();

		expect(todoAfter.length - todoBefore.length).toBe(1);
		expect(response.status).toBe(201);
		expect(response.body.data.todo.text).toBe("Eat dinner!!");
		done();
	});
});

describe("PUT", () => {
	test("Should update an existing todo in the database based on a given id", async done => {
		const todo = await createTodo({
			title: "New Test todo",
			text: "We move, I guess",
		});
		const todoId = todo.id;

		const res = await request.put(`/todos/${todoId}`).send({
			completed: true,
		});

		expect(res.status).toBe(202);
		expect(res.body.data.todo.completed).toBeTruthy();
		done();
	});
});

describe("DELETE", () => {
	test("Should delete an existing todo based on the given id", async done => {
		const todo = await createTodo({
			title: "New Test todo to Delete",
			text: "We move, I guess",
		});

		const todoId = todo.id;

		const res = await request.delete(`/todos/${todoId}`);
		const matchingTodo = await Todo.findById(todoId);

		expect(res.status).toBe(204);
		expect(matchingTodo).toBeNull();
		done();
	});
});
