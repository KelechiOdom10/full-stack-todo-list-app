import React, { useEffect } from "react";
import { Heading, Stack, Spinner } from "@chakra-ui/core";
import Todo from "./Todo";
import { useGlobalState } from "../context/GlobalState";

function TodoList() {
	const { loading, todos, getTodos } = useGlobalState();

	useEffect(() => {
		getTodos();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{todos.length < 1 ? (
				<Heading mt={5}>{`Welcome ${localStorage.getItem(
					"appUsername"
				)}, you currently have no Tasks.`}</Heading>
			) : (
				<Stack mt={4}>
					{loading ? (
						<Spinner
							thickness="4px"
							speed="0.8s"
							emptyColor="gray.200"
							color="blue.500"
							size="xl"
						/>
					) : (
						todos.map(todo => <Todo key={todo._id} todo={todo} />)
					)}
				</Stack>
			)}
		</>
	);
}

export default TodoList;
