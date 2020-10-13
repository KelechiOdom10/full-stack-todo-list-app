import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Home from "./components/Home";

import { GlobalStateProvider } from "./context/GlobalState";

function App() {
	return (
		<ThemeProvider>
			<CSSReset />
			<GlobalStateProvider>
				<Home />
			</GlobalStateProvider>
		</ThemeProvider>
	);
}
export default App;
