import React from "react";
import {
	Flex,
	Box,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/core";
import { useState } from "react";
import axios from "axios";

function Home() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");

	const handleRegister = async e => {
		e.preventDefault();
		try {
			const response = await axios.post("api/v1/auth/register", {
				email,
				password,
				username,
			});
			setToken(response.data.token);
			setEmail("");
			setPassword("");
			setUsername("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{token ? (
				<Alert
					status="success"
					variant="subtle"
					flexDirection="column"
					justifyContent="center"
					textAlign="center"
					height="200px"
				>
					<AlertIcon size="40px" mr={0} />
					<AlertTitle mt={4} mb={1} fontSize="lg">
						Registration submitted!
					</AlertTitle>
					<AlertDescription maxWidth="sm">
						Login at the top of the page to access Todos.
					</AlertDescription>
				</Alert>
			) : null}
			<Flex width="full" justifyContent="center">
				<Box p={2}>
					<Box textAlign="center">
						<Heading>Sign Up</Heading>
					</Box>
					<Box my={4} textAlign="left" width="80vw">
						<form onSubmit={handleRegister}>
							<FormControl isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									type="text"
									placeholder="Enter username"
									onChange={e => setUsername(e.target.value)}
									value={username}
								/>
							</FormControl>
							<FormControl mt={6} isRequired>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									placeholder="Enter Email Address"
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</FormControl>
							<FormControl mt={6} isRequired>
								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									placeholder="*******"
									onChange={e => setPassword(e.target.value)}
									value={password}
								/>
							</FormControl>
							<Button width="full" mt={4} type="submit">
								Sign Up
							</Button>
						</form>
					</Box>
				</Box>
			</Flex>
		</>
	);
}

export default Home;
