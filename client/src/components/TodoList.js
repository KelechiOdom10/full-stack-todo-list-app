import React from "react";
import { Stack } from "@chakra-ui/core";
import { useGlobalState } from "../context/GlobalState";
import Todo from "./Todo";

function TodoList() {
	const { todos, dispatch } = useGlobalState();
	return (
		<>
			<Stack mt={4}>
				{todos.map(todo => (
					<Todo
						dispatch={dispatch}
						id={todo.id}
						text={todo.text}
						title={todo.title}
						key={todo.id}
						completed={todo.completed}
					/>
				))}
			</Stack>
		</>
	);
}

export default TodoList;
