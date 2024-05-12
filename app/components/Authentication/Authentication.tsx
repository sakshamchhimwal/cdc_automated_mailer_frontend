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

const Authentication = () => {
	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Welcome back!
			</Title>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Email"
					placeholder="xxx@iitdh.ac.in"
					required
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					required
					mt="md"
				/>
				<Group justify="space-between" mt="lg">
					<Checkbox label="Remember me" />
					<Anchor component="button" size="sm">
						Contact Admin
					</Anchor>
				</Group>
				<Button fullWidth mt="xl">
					Sign in
				</Button>
			</Paper>
		</Container>
	);
};

export default Authentication;
