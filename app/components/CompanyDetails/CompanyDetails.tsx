import { Divider, Title } from "@mantine/core";
import { CompanyDetails } from "../../utils/types";

function CompanyDetailsCard({ data }: { data: CompanyDetails }) {
	return (
		<>
			<Title order={1} pb={10}>
				Company Name: {data?.companyName}
			</Title>
			<Divider />
			<Title order={3} pb={10} pt={10}>
				HR Email Address: {data?.hrEmail}
			</Title>
			<Divider />
		</>
	);
}

export default CompanyDetailsCard;
