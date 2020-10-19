import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStateProvider } from "./context/GlobalState";
import { LocalStateProvider } from "./context/LocalStateContext";

ReactDOM.render(
	<React.StrictMode>
		<LocalStateProvider>
			<GlobalStateProvider>
				<App />
			</GlobalStateProvider>
		</LocalStateProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
