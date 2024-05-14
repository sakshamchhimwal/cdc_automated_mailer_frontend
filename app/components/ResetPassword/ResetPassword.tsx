"use client";
import React, { useState } from "react";
import {
	Paper,
	Title,
	Button,
	Container,
	Group,
	Anchor,
	Center,
	Box,
	rem,
	PasswordInput,
	Input,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
	const [data, setData] = useState({
		password: "",
		newPassword: ""
	});

	const [errorMessage, setErrorMessage] = useState("");

	const confirmPassword = () => {
		const { password, newPassword } = data;
		if ( password ==="") {
			setErrorMessage("Enter Valid Password");
		} else {
			setErrorMessage("");
		}

		if ( password !== newPassword) {
			setErrorMessage("Passwords don't match");
		} else {
			setErrorMessage("");
		}
	};

	const handleChange = (e: { target: { name: any; value: any; }; }) => {
		const { name, value } = e.target;
		setData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	};

	return (
		<Container size={460} my={30}>
			<Title className={classes.title} ta="center" c="red">
				IMPORTANT!! <br /> RESET YOUR PASSWORD
			</Title>
			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<PasswordInput
					label="New Password"
					name="password"
					required
					mb={10}
					value={data.password}
					onChange={handleChange}
				/>
				{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
				<PasswordInput
				    label="Verify New Password"
					name="newPassword"
					required
					value={data.newPassword}
					onChange={handleChange}
				/>
				
				<Group justify="space-between" mt="lg" className={classes.controls}>
					<Button className={classes.control} onClick={confirmPassword}>Reset password</Button>
				</Group>
			</Paper>
		</Container>
	);
};

export default ResetPassword;
