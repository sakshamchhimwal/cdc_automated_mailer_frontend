"use client";
import CompanyDetailsCard from "../../components/CompanyDetails/CompanyDetails";
import { getCompanyDetails } from "../../api/companyHandler";
import CompanyMailCard from "../../components/CompanyMailCard/CompanyMailCard";
import { useCallback, useEffect, useState } from "react";
import { APIResponse } from "../../utils/types";
import { Box } from "@mantine/core";

export default function CompanyDetails({ params }: { params: { id: number } }) {
	const [data, setData] = useState<APIResponse>();

	const getAndSetData = useCallback(async () => {
		const res = await getCompanyDetails(params.id);
		setData(res);
	}, []);

	useEffect(() => {
		getAndSetData();
	}, [getAndSetData]);

	const templates = [
		data?.data.template1,
		data?.data.template2,
		data?.data.template3,
	];

	return (
		<Box p={10}>
			<CompanyDetailsCard data={data?.data} />
			<CompanyMailCard templates={templates} id={params.id} />
		</Box>
	);
}
