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
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
	return (
		<Container size={460} my={30}>
			<Title className={classes.title} ta="center" c="red">
				IMPORTANT!! <br /> RESET YOUR PASSWORD
			</Title>
			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<PasswordInput label="New Password" required mb={10} />
				<PasswordInput label="Verify New Password" required />
				<Group
					justify="space-between"
					mt="lg"
					className={classes.controls}
				>
					<Anchor c="dimmed" size="sm" className={classes.control}>
						<Center inline>
							<IconArrowLeft
								style={{ width: rem(12), height: rem(12) }}
								stroke={1.5}
							/>
							<Box ml={5}>Back to the login page</Box>
						</Center>
					</Anchor>
					<Button className={classes.control}>Reset password</Button>
				</Group>
			</Paper>
		</Container>
	);
};

export default ResetPassword;
