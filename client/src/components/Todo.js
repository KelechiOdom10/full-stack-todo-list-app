import React, { useState } from "react";
import {
	Flex,
	Heading,
	Text,
	Checkbox,
	IconButton,
	Stack,
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/core";
import { useGlobalState } from "../context/GlobalState";

function Todo(props) {
	const { todo } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { deleteTodo, updateTodo, toggleTodo } = useGlobalState();

	const [modalTitle, setModalTitle] = useState(todo.title);
	const [modalText, setModalText] = useState(todo.text);

	const handleModalTitleChange = e => {
		setModalTitle(e.target.value);
	};

	const handleModalTextChange = e => {
		setModalText(e.target.value);
	};

	return (
		<>
			<Stack
				p={3}
				shadow="md"
				borderWidth="1px"
				rounded="lg"
				overflow="hidden"
				justifyContent="space-between"
				isInline
				mb={3}
			>
				<Stack>
					<Heading as={todo.completed ? "del" : null} fontSize="xl">
						{todo.title}
					</Heading>
					<Text mt={1} as={todo.completed ? "del" : null}>
						{todo.text}
					</Text>
				</Stack>

				<Flex align="center">
					<Checkbox
						p={2}
						onChange={() =>
							toggleTodo(todo._id, { completed: !todo.completed })
						}
					/>
					<IconButton
						variantColor="green"
						aria-label="Edit Todo"
						icon="edit"
						size="sm"
						m={2}
						onClick={onOpen}
					/>
					<IconButton
						variantColor="red"
						aria-label="Delete Todo"
						icon="delete"
						size="sm"
						m={2}
						onClick={() => deleteTodo(todo._id)}
					/>
				</Flex>
			</Stack>

			{/* Modal for Editing existing Todo List */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel htmlFor="title">Title:</FormLabel>
							<Input
								onChange={handleModalTitleChange}
								value={modalTitle}
								type="text"
								id="title"
								aria-describedby="title-helper-text"
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="text">Description:</FormLabel>
							<Input
								onChange={handleModalTextChange}
								value={modalText}
								type="text"
								id="text"
								aria-describedby="text-helper-text"
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							variantColor="blue"
							mr={3}
							onClick={() => {
								updateTodo(todo._id, {
									id: todo.id,
									text: modalText,
									title: modalTitle,
								});
								onClose();
							}}
						>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default Todo;
