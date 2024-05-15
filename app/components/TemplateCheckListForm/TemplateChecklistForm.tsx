"use client";

import { Box, Button, Checkbox, Divider, Title } from "@mantine/core";
import { useState } from "react";

const TemplateChecklistForm = ({
	handleSubmit,
}: {
	handleSubmit: () => any;
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
			<Button disabled={!allChecked} onClick={handleSubmit} m={10}>
				Verify
			</Button>
		</Box>
	);
};

export default TemplateChecklistForm;
