const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title: { type: String, required: [true, "Please add a Title for Todo"] },
	text: { type: String, required: [true, "Please add a description for Todo"] },
	completed: { type: Boolean, default: false },
	user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
