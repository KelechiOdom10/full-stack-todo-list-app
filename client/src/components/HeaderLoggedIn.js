import React from "react";
import { Box, Flex, Image, Button } from "@chakra-ui/core";
import "../App.css";
import { navigate } from "@reach/router";
import { useLocalState } from "../context/LocalStateContext";

function HeaderLoggedIn() {
	const { dispatch } = useLocalState();

	const handleLogout = async e => {
		dispatch({ type: "LOG_OUT" });
		localStorage.removeItem("appToken");
		localStorage.removeItem("appUsername");
		navigate("/");
	};

	return (
		<Flex
			bg="#4299E1"
			w="100%"
			px={2}
			py={2}
			justifyContent="space-between"
			alignItems="center"
		>
			<Flex flexDirection="row" justifyContent="center" alignItems="center">
				<Image
					src="https://img.icons8.com/carbon-copy/2x/ffffff/todo-list.png"
					size={39}
				/>
			</Flex>
			<Box>
				<Button
					variantColor="blue"
					type="submit"
					ml={3}
					pl={4}
					onClick={handleLogout}
				>
					Logout
				</Button>
			</Box>
		</Flex>
	);
}

export default HeaderLoggedIn;
