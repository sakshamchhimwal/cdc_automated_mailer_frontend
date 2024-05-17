"use client";
import {
	Group,
	Button,
	Text,
	Divider,
	Box,
	Burger,
	Drawer,
	ScrollArea,
	rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
	const router = useRouter();

	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		let mount = true;
		if (mount) {
			if (localStorage.getItem("CDC_USER_TOKEN")) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		}
		return () => {
			mount = false;
		};
	}, []);

	return (
		<Box pb={12}>
			<header className={classes.header}>
				<Group justify="space-between" h="100%">
					<Text size="xl" fw={700}>
						CDC - Automated Mailer
					</Text>
					<Group visibleFrom="sm">
						{!isLoggedIn && (
							<Button
								onClick={() => {
									router.push("/login");
								}}
							>
								Log in
							</Button>
						)}
					</Group>

					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						hiddenFrom="sm"
					/>
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="Navigation"
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
					<Divider my="sm" />
					<Group justify="center" grow pb="xl" px="md">
						{!isLoggedIn && (
							<Button
								variant="default"
								onClick={() => {
									router.push("/login");
								}}
							>
								Log in
							</Button>
						)}
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
};

export default Header;
