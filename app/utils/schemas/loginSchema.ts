import z from "zod";

export const LoginSchema = z.object({
	emailId: z
		.string()
		.email()
		.regex(new RegExp(/(.*)@iitdh\.ac\.in/gm), "Must be IIT-Dh Account"),
	password: z.string().min(6),
});

export type User = z.infer<typeof LoginSchema>;
