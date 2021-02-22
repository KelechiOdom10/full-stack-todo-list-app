import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import "./App.css";
import { Router } from "@reach/router";
import Home from "./components/Home";
import HomeGuest from "./components/HomeGuest";
import Header from "./components/Header";
import { useLocalState } from "./context/LocalStateContext";

function App() {
	const { loggedIn } = useLocalState();

	return (
		<ThemeProvider>
			<CSSReset />
			<Header loggedIn={loggedIn} />
			<Router>{loggedIn ? <HomeGuest path="/" /> : <Home path="/" />}</Router>
		</ThemeProvider>
	);
}
export default App;
