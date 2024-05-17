"use client";

import { Box, Button, Checkbox, Divider, Textarea, Title } from "@mantine/core";
import { useState } from "react";

const TemplateChecklistForm = ({
	handleSubmit,
	isVerifyLoading,
}: {
	handleSubmit: () => any;
	isVerifyLoading: boolean;
}) => {
	const [parameters, setParameters] = useState<any>({
		Remove_Subject_Line: false,
		Add_HR_Name: false,
		Verify_INF_JNF_Link: false,
		Add_Your_Signature: false,
		Remove_Extra_New_Lines: false,
	});

	// No need for separate state for validity, check directly in the button
	const allChecked = Object.values(parameters).every((value) => value === true);

	const handleParameterChange = (key: string) => {
		setParameters((prevParams: any) => ({
			...prevParams,
			[key]: !prevParams[key],
		}));
	};

	return (
		<Box display="flex" style={{ flexDirection: "column" }} pl={10}>
			<Title order={3} pb={20}>
				Verify
			</Title>
			<Title order={4} p={20} style={{ color: "red" }}>
				Add this text to the template if needed.
			</Title>
			<Textarea
				cols={30}
				rows={5}
				value='Additionally, if you wish to participate, we have included a <a href="https://cdc.iitdh.ac.in/portal/jnf">JNF</a> that needs to be filled out before moving forward with further proceedings.'
			/>
			<Button
				onClick={() => {
					navigator.clipboard.writeText(
						"Additionally, if you wish to participate, we have included a <a href='https://cdc.iitdh.ac.in/portal/jnf'>JNF</a> that needs to be filled out before moving forward with further proceedings."
					);
				}}
				m={10}
			>
				Copy and Paste
			</Button>
			{Object.keys(parameters).map((key) => {
				const query = key.replaceAll("_", " ");
				return (
					<>
						<Box
							display="flex"
							key={key}
							style={{ alignItems: "center" }}
							pb={10}
							pt={10}
						>
							<Box flex={3}>{query}</Box>
							<Box flex={1}>
								<Checkbox
									checked={parameters[key]}
									onClick={() => {
										handleParameterChange(key);
									}}
								/>
							</Box>
						</Box>
						<Divider />
					</>
				);
			})}
			<Button
				disabled={!allChecked || isVerifyLoading}
				onClick={handleSubmit}
				m={10}
			>
				Verify
			</Button>
		</Box>
	);
};

export default TemplateChecklistForm;
