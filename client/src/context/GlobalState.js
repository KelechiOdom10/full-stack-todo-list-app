import React, { useReducer, useContext, createContext } from "react";

function todoReducer(state, action) {
	switch (action.type) {
		case "add_todos":
			return {
				...state,
				todos: [...state.todos, { ...action.payload }],
			};
		case "toggle_todos":
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id === action.payload
						? { ...todo, completed: !todo.completed }
						: todo
				),
			};
		case "update_todos":
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id === action.payload.id
						? {
								...todo,
								text: action.payload.text,
								title: action.payload.title,
						  }
						: todo
				),
			};
		case "remove_todos":
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.payload),
			};
		default:
			return state;
	}
}

const initialState = {
	todos: [
		// { id: 1, text: "Flower", amount: -20 },
		// { id: 2, text: "Salary", amount: 300 },
		// { id: 3, text: "Book", amount: -10 },
		// { id: 4, text: "Camera", amount: 150 },
	],
};

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(todoReducer, initialState);
	const { todos } = state;

	return (
		<GlobalStateContext.Provider
			value={{
				todos,
				dispatch,
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
