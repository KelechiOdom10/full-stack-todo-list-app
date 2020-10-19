import React from "react";
import { Stack, Spinner } from "@chakra-ui/core";
import Todo from "./Todo";

function TodoList(props) {
	const { loading, todos } = props;
	return (
		<>
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
		</>
	);
}

export default TodoList;
