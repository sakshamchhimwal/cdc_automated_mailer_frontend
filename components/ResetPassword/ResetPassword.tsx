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
import {
	IconArrowLeft,
	IconChecks,
	IconExclamationCircle,
} from "@tabler/icons-react";
import classes from "./ResetPassword.module.css";
import { resetPassword } from "../../api/loginHandler";
import { notifications } from "@mantine/notifications";
import Colors from "../../utils/colors";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
	const router = useRouter();

	const [data, setData] = useState({
		password: "",
		newPassword: "",
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async () => {
		const response = await resetPassword(data.password);

		if (response.status === 200) {
			notifications.show({
				title: "Success",
				message: response.message,
				color: Colors.GREEN,
				icon: <IconChecks stroke={1} />,
			});
			localStorage.removeItem("CDC_USER_TOKEN");
			notifications.show({
				title: "Verify",
				message: "Please login again",
				color: Colors.YELLOW,
				icon: <IconChecks stroke={1} />,
			});
			router.push("/login");
		} else {
			notifications.show({
				title: "Error",
				message: response.message,
				color: Colors.RED,
				icon: <IconExclamationCircle stroke={1} />,
			});
			if (response.status === 401) {
				localStorage.removeItem("CDC_USER_TOKEN");
				notifications.show({
					title: "Session timed out",
					message: "Please login again",
					color: Colors.RED,
					icon: <IconExclamationCircle stroke={1} />,
				});
				router.push("/login");
			}
		}
	};

	const confirmPassword = () => {
		const { password, newPassword } = data;
		if (password.length < 8) {
			setErrorMessage("Password too short");
			return;
		} else {
			setErrorMessage("");
		}

		if (password !== newPassword) {
			setErrorMessage("Passwords don't match");
			return;
		} else {
			setErrorMessage("");
		}

		handleSubmit();
	};

	const handleChange = (e: { target: { name: any; value: any } }) => {
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
					<Button className={classes.control} onClick={confirmPassword}>
						Reset password
					</Button>
				</Group>
			</Paper>
		</Container>
	);
};

export default ResetPassword;
