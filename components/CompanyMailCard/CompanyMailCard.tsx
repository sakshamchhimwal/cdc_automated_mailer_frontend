import { Accordion, Box, Button, Code, Title } from "@mantine/core";
import { IconNumber1, IconNumber2, IconNumber3 } from "@tabler/icons-react";
import Link from "next/link";

function CompanyMailCard({
	templates,
	id,
}: {
	templates: string[];
	id: number;
}) {
	const IconMap = {
		1: <IconNumber1 />,
		2: <IconNumber2 />,
		3: <IconNumber3 />,
	};

	const items = templates.map((item, index) => (
		<Accordion.Item key={index + 1} value={(index + 1).toString()}>
			{/* @ts-ignore */}
			<Accordion.Control>{IconMap[`${index + 1}`]}</Accordion.Control>
			<Accordion.Panel>
				<Box>
					<pre
						style={{
							whiteSpace: "pre-wrap",
						}}
					>
						{item}
					</pre>
					<Box
						display="flex"
						style={{
							justifyContent: "end",
						}}
					>
						<Link href={`/company/${id}/${index + 1}`}>
							<Button variant="filled">Edit And Send</Button>
						</Link>
					</Box>
				</Box>
			</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<>
			<Title order={3} pt={10} pb={10}>
				Available Templates
			</Title>
			<Accordion variant="filled" radius="md" chevronPosition="right" pt={10}>
				{items}
			</Accordion>
		</>
	);
}

export default CompanyMailCard;
