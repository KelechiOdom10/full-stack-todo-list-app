import React, { useState } from "react";
import { Box, Flex, Image, Input, Button, FormControl } from "@chakra-ui/core";
import "../App.css";
import { useLocalState } from "../context/LocalStateContext";
import axios from "axios";

function HeaderLoggedOut() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch } = useLocalState();

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await axios.post("api/v1/auth/login", {
				email,
				password,
			});
			if (response.data) {
				localStorage.setItem("appToken", response.data.token);
				localStorage.setItem("appUsername", response.data.user.username);
				dispatch({ type: "LOG_IN" });
			} else {
				console.log("Incorrect username/password");
			}
		} catch (error) {
			console.log(error);
		}
		setPassword("");
		setEmail("");
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
				<form onSubmit={handleSubmit}>
					<Flex flexDirection="row" justifyContent="center" alignItems="center">
						<FormControl pl={3} isRequired>
							<Input
								placeholder="Enter email..."
								onChange={e => setEmail(e.target.value)}
								value={email}
								type="email"
								id="emailLogin"
							/>
						</FormControl>
						<FormControl pl={3} isRequired>
							<Input
								placeholder="Enter password..."
								onChange={e => setPassword(e.target.value)}
								value={password}
								type="password"
								id="passwordLogin"
							/>
						</FormControl>

						<Button variantColor="blue" type="submit" ml={3} pl={4}>
							Login
						</Button>
					</Flex>
				</form>
			</Box>
		</Flex>
	);
}

export default HeaderLoggedOut;
