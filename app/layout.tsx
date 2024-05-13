import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Header from "./components/Header/Header";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export const metadata = {
	title: "CDC Mailer",
	description: "Send mails automatically",
};

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<MantineProvider forceColorScheme="dark">
					<Header />
					<Notifications position="top-right" />
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
