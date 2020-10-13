import React from "react";
import AddTodos from "./AddTodos";
import "../App.css";
import TodoList from "./TodoList";

function Home() {
	return (
		<div className="app">
			<AddTodos />
			<TodoList />
		</div>
	);
}

export default Home;
