import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";

function todoReducer(state, action) {
	switch (action.type) {
		case "GET_TODOS":
			return {
				...state,
				loading: false,
				todos: action.payload,
			};
		case "ADD_TODOS":
			return {
				...state,
				todos: [...state.todos, { ...action.payload }],
			};
		case "TOGGLE_TODO":
			return {
				...state,
				todos: state.todos.map(todo =>
					todo._id === action.payload._id
						? { ...todo, completed: action.payload.completed }
						: todo
				),
			};
		case "UPDATE_TODO":
			return {
				...state,
				todos: state.todos.map(todo =>
					todo._id === action.payload._id
						? {
								...todo,
								text: action.payload.text,
								title: action.payload.title,
						  }
						: todo
				),
			};
		case "REMOVE_TODOS":
			return {
				...state,
				todos: state.todos.filter(todo => todo._id !== action.payload),
			};
		case "TRANSACTION_ERROR":
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
}

const initialState = {
	todos: [],
	error: null,
	loading: true,
};

//* Create Context
const GlobalStateContext = createContext();

//* Provider Component
const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(todoReducer, initialState);
	const { todos, error, loading } = state;

	//* Actions
	async function getTodos() {
		try {
			const res = await axios.get("/api/v1/todos");
			dispatch({
				type: "GET_TODOS",
				payload: res.data.data.todos,
			});
		} catch (err) {
			dispatch({
				type: "TODO_ERROR",
				payload: err.response.data.error,
			});
		}
	}

	async function deleteTodo(id) {
		try {
			await axios.delete(`/api/v1/todos/${id}`);
			dispatch({
				type: "REMOVE_TODOS",
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: "TODO_ERROR",
				payload: err.response.data.error,
			});
		}
	}

	async function addTodos(todo) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post("/api/v1/todos", todo, config);
			dispatch({
				type: "ADD_TODOS",
				payload: res.data.data.todo,
			});
		} catch (err) {
			dispatch({
				type: "TODO_ERROR",
				payload: err.response.data.error,
			});
		}
	}

	async function updateTodo(id, todo) {
		const { text, title } = todo;
		try {
			const res = await axios.put(`/api/v1/todos/${id}`, { text, title });
			dispatch({
				type: "UPDATE_TODO",
				payload: res.data.data.todo,
			});
		} catch (err) {
			dispatch({
				type: "TODO_ERROR",
				payload: err.response.data.error,
			});
		}
	}

	async function toggleTodo(id, todo) {
		try {
			const res = await axios.put(`/api/v1/todos/${id}`, todo);
			dispatch({
				type: "TOGGLE_TODO",
				payload: res.data.data.todo,
			});
		} catch (err) {
			dispatch({
				type: "TODO_ERROR",
				payload: err.response.data.error,
			});
		}
	}

	return (
		<GlobalStateContext.Provider
			value={{
				todos,
				error,
				loading,
				dispatch,
				getTodos,
				deleteTodo,
				addTodos,
				updateTodo,
				toggleTodo,
			}}
		>
			{children}
		</GlobalStateContext.Provider>
	);
};

const useGlobalState = () => {
	const all = useContext(GlobalStateContext);
	return all;
};

export { GlobalStateProvider, useGlobalState };
