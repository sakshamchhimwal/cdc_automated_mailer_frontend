"use client";

import { useCallback, useEffect, useState } from "react";
import { APIResponse } from "../../../utils/types";
import { getCompanyDetails, updateTemplate } from "../../../api/companyHandler";
import { Box, Button, Center, Divider, Textarea, Title } from "@mantine/core";
import TemplateChecklistForm from "../../../components/TemplateCheckListForm/TemplateChecklistForm";
import { notifications } from "@mantine/notifications";
import Colors from "../../../utils/colors";
import { IconChecks, IconExclamationCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { sendMail } from "../../../api/userHandler";

export default function MailDetails({
	params,
}: {
	params: { template: number; id: number };
}) {
	const [currentTemplate, setCurrentTemplate] = useState<string>("");
	const [isVerified, setIsVerified] = useState(false);
	const router = useRouter();

	const getAndSetData = useCallback(async () => {
		const res = await getCompanyDetails(params.id);
		const templates = [
			res?.data.template1,
			res?.data.template2,
			res?.data.template3,
		];
		setCurrentTemplate(templates[params.template - 1]);
	}, []);

	useEffect(() => {
		getAndSetData();
	}, [getAndSetData]);

	const handleSubmit = async () => {
		const response = await updateTemplate(
			params.id,
			params.template,
			currentTemplate
		);
		if (response.status === 200) {
			notifications.show({
				title: "Success",
				message: response.message,
				color: Colors.GREEN,
				icon: <IconChecks stroke={1} />,
			});
			setIsVerified(true);
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

	const handleSendMail = async () => {
		const response = await sendMail(params.id, params.template);
		if (response.status === 200) {
			notifications.show({
				title: "Success",
				message: response.message,
				color: Colors.GREEN,
				icon: <IconChecks stroke={1} />,
			});
			router.push("/");
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

	return (
		<>
			<Title order={3} p={20}>
				Template {params.template}
			</Title>
			<Divider />
			<Box p={10} display="flex">
				<Textarea
					value={currentTemplate}
					rows={30}
					flex={3}
					onChange={(e) => {
						setCurrentTemplate(e.target.value);
					}}
				/>
				<Box
					flex={1}
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<TemplateChecklistForm handleSubmit={handleSubmit} />
					<Box
						display="flex"
						style={{
							justifyContent: "center",
						}}
					>
						<Button
							disabled={!isVerified}
							onClick={handleSendMail}
							m={10}
							w="min-content"
							color={Colors.RED}
						>
							Send
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
}
