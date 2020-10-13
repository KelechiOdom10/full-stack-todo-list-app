import React, { useState } from "react";
import {
	Input,
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
} from "@chakra-ui/core";
import { useGlobalState } from "../context/GlobalState";

function AddTodos(props) {
	const { dispatch } = useGlobalState();
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");

	const handleTitleChange = e => {
		setTitle(e.target.value);
	};

	const handleTextChange = e => {
		setText(e.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		console.log(text, title);
		dispatch({
			type: "add_todos",
			payload: {
				id: Math.floor(Math.random() * 10000000),
				title,
				text,
				completed: false,
			},
		});
		setText("");
		setTitle("");
	};
	return (
		<form onSubmit={handleSubmit}>
			<FormControl>
				<FormLabel htmlFor="title">Title:</FormLabel>
				<Input
					// placeholder="Add title of todo..."
					onChange={handleTitleChange}
					value={title}
					type="text"
					id="title"
					aria-describedby="title-helper-text"
				/>
				<FormHelperText id="title-helper-text">
					Enter the title of your Todo Item.
				</FormHelperText>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor="text">Description:</FormLabel>
				<Input
					// placeholder="Add todo description..."
					onChange={handleTextChange}
					value={text}
					type="text"
					id="text"
					aria-describedby="text-helper-text"
				/>
				<FormHelperText id="text-helper-text">
					Enter the description of your Todo Item.
				</FormHelperText>
			</FormControl>

			<Button variantColor="blue" type="submit" marginTop={3}>
				Submit
			</Button>
		</form>
	);
}

export default AddTodos;
