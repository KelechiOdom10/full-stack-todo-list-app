import React, { useEffect } from "react";
import { useGlobalState } from "../context/GlobalState";
import AddTodos from "./AddTodos";
import TodoList from "./TodoList";

function HomeGuest() {
	return (
		<div className="app">
			<AddTodos />
			<TodoList />
		</div>
	);
}

export default HomeGuest;
