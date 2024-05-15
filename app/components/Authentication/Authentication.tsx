"use client";
import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from "@mantine/core";
import classes from "./Authentication.module.css";
import { LoginSchema } from "../../utils/FormSchemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../../utils/types";
import { userLogin } from "../../api/loginHandler";
import { notifications } from "@mantine/notifications";
import { IconExclamationCircle, IconChecks } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Colors from "../../utils/colors";

const Authentication = () => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(LoginSchema),
	});

	const router = useRouter();

	const onSubmit = async (data: FormSchema) => {
		const response = await userLogin(data);

		if (response.status !== 200) {
			notifications.show({
				title: "Error",
				message: response.message,
				color: Colors.RED,
				icon: <IconExclamationCircle stroke={1} />,
			});
		} else {
			if (response.token)
				localStorage.setItem("CDC_USER_TOKEN", response.token);

			if (response.data) {
				localStorage.setItem(
					"USER_DATA",
					JSON.stringify(response.data)
				);
				if (response.data?.userSignUp === true) {
					router.push("/");
				} else {
					router.push("/passwordReset");
				}
			}

			notifications.show({
				title: "Success",
				message: response.message,
				color: Colors.GREEN,
				icon: <IconChecks stroke={1} />,
			});
		}
	};

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Welcome back!
			</Title>

			<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<TextInput
						label="Email"
						placeholder="xxx@iitdh.ac.in"
						required
						{...form.register("emailId", { required: true })}
					/>
					{form.formState.errors?.emailId && (
						<Text c="red" size="xs">
							{form.formState.errors?.emailId.message}
						</Text>
					)}
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						mt="md"
						{...form.register("password", { required: true })}
					/>
					{form.formState.errors?.password && (
						<Text c="red" size="xs">
							{form.formState.errors?.password.message}
						</Text>
					)}
					<Group justify="space-between" mt="lg">
						<Checkbox label="Remember me" />
						<Anchor component="button" size="sm">
							Contact Admin
						</Anchor>
					</Group>
					<Button fullWidth mt="xl" type="submit">
						Sign in
					</Button>
				</Paper>
			</form>
		</Container>
	);
};

export default Authentication;
