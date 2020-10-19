import React, { useReducer, useContext, createContext } from "react";

const LocalStateContext = createContext();

const initialState = {
	loggedIn: Boolean(localStorage.getItem("appToken")),
};

const reducer = (state, action) => {
	switch (action.type) {
		case "LOG_IN":
			return { ...state, loggedIn: true };
		case "LOG_OUT":
			return { ...state, loggedIn: false };
		default:
			return state;
	}
};

const LocalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loggedIn } = state;

	return (
		<LocalStateContext.Provider value={{ loggedIn, dispatch }}>
			{children}
		</LocalStateContext.Provider>
	);
};

const useLocalState = () => {
	const all = useContext(LocalStateContext);
	return all;
};

export { LocalStateProvider, useLocalState };
