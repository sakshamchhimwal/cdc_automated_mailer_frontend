"use client";
import cx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { Table, ScrollArea, Text, Checkbox, Button } from "@mantine/core";
import classes from "./DataTable.module.css";
import { getMailingList } from "../../api/userHandler";
import { CompanyDetails } from "../../utils/types";
import { notifications } from "@mantine/notifications";
import { IconExclamationCircle } from "@tabler/icons-react";
import Colors from "../../utils/colors";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RenderTable = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	const [scrolled, setScrolled] = useState(false);
	const router = useRouter();
	const [mailList, setMailList] = useState<CompanyDetails[]>([]);

	const fetchAndSetMailingList = useCallback(async () => {
		const response = await getMailingList();
		if (response.status === 200) {
			setMailList(response.data);
		} else if (response.status !== 200) {
			notifications.show({
				title: "Error",
				message: response.message,
				color: Colors.RED,
				icon: <IconExclamationCircle stroke={1} />,
			});
			if (response.status === 401) {
				notifications.show({
					title: "Session Timed Out",
					message: response.message,
					color: Colors.RED,
					icon: <IconExclamationCircle stroke={1} />,
				});
				router.push("/login");
			}
		}
	}, []);

	useEffect(() => {
		fetchAndSetMailingList();
	}, [fetchAndSetMailingList]);

	if (!isLoggedIn) {
		return (
			<Text
				fw={900}
				display="flex"
				style={{
					fontSize: "80px",
					justifyContent: "center",
					height: "90vh",
					alignItems: "center",
				}}
			>
				Your are not logged in. <br /> Login
			</Text>
		);
	}

	const rows = mailList?.map((row) => (
		<Table.Tr key={row.ID}>
			<Table.Td>
				<Link href={`/company/${row.ID}`}>
					<Button>{row.companyName}</Button>
				</Link>
			</Table.Td>
			<Table.Td>{row.hrEmail}</Table.Td>
			<Table.Td>
				{" "}
				<Checkbox checked={row.mailSent} />
			</Table.Td>
			<Table.Td>
				<Checkbox checked={row.mailVerified} />
			</Table.Td>
		</Table.Tr>
	));

	console.log(rows);

	return (
		<>
			<Text
				size="xl"
				fw={900}
				display="flex"
				style={{
					justifyContent: "center",
				}}
			>
				Your Mailing List
			</Text>
			<ScrollArea
				h="90vh"
				onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
				p={20}
			>
				<Table miw={700}>
					<Table.Thead
						className={cx(classes.header, {
							[classes.scrolled]: scrolled,
						})}
					>
						<Table.Tr>
							<Table.Th>Company Name</Table.Th>
							<Table.Th>HR Email</Table.Th>
							<Table.Th>Mail Sent</Table.Th>
							<Table.Th>Mail Verified</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
		</>
	);
};

export function DataTable() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkAndSetIsLoggedIn = useCallback(() => {
		const token = localStorage.getItem("CDC_USER_TOKEN");
		if (!token) {
			setIsLoggedIn(false);
		} else {
			setIsLoggedIn(true);
		}
	}, [localStorage]);

	useEffect(() => {
		checkAndSetIsLoggedIn();
	}, [checkAndSetIsLoggedIn]);

	return <RenderTable isLoggedIn={isLoggedIn} />;
}
