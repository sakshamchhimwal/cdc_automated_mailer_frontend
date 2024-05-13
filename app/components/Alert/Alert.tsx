import { Alert } from "@mantine/core";

export enum Colors {
	RED = "red",
	CYAN = "cyan",
	GREEN = "green",
	YELLOW = "yellow",
}

type Props = {
	children: any;
	color: Colors;
	title: string;
	icon: any;
};

const MessageAlert = ({ children, color, title, icon }: Props) => {
	return (
		<Alert
			variant="light"
			color={color}
			title={title}
			icon={icon}
			withCloseButton
		>
			{children}
		</Alert>
	);
};

export default MessageAlert;
