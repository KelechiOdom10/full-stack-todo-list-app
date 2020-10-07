const mongoose = require("mongoose");
const Todo = require("./models/todoModel");

mongoose.connect("mongodb://localhost/simple-demo", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const seedOperation = async () => {
	const firstTodo = await Todo.create({
		title: "Test Todo",
		text: "wash da dishes",
	});
};

seedOperation();
