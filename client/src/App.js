import React, { useEffect } from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import "./App.css";
import AddTodos from "./components/AddTodos";
import TodoList from "./components/TodoList";
import { useGlobalState } from "./context/GlobalState";

function App() {
	const { loading, todos, getTodos } = useGlobalState();

	useEffect(() => {
		getTodos();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ThemeProvider>
			<CSSReset />
			<div className="app">
				<AddTodos />
				<TodoList todos={todos} loading={loading} />
			</div>
		</ThemeProvider>
	);
}
export default App;
