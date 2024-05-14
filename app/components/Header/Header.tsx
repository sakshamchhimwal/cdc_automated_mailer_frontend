"use client";
import {
	HoverCard,
	Group,
	Button,
	UnstyledButton,
	Text,
	SimpleGrid,
	ThemeIcon,
	Anchor,
	Divider,
	Center,
	Box,
	Burger,
	Drawer,
	Collapse,
	ScrollArea,
	rem,
	useMantineTheme,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";
import {
	IconNotification,
	IconCode,
	IconBook,
	IconChartPie3,
	IconFingerprint,
	IconCoin,
	IconChevronDown,
} from "@tabler/icons-react";
import classes from "./Header.module.css";
import { useEffect, useState } from "react";
import { log } from "console";

const Header = () => {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		let mount = true;
		if (mount) {
			if (localStorage.getItem("CDC_USER_TOKEN") !== undefined) {
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
		<Box pb={120}>
			<header className={classes.header}>
				<Group justify="space-between" h="100%">
					<Text size="xl" fw={700}>
						CDC - Automated Mailer
					</Text>
					<Group visibleFrom="sm">
						{!isLoggedIn && <Button>Log in</Button>}
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
							<Button variant="default">Log in</Button>
						)}
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
};

export default Header;
