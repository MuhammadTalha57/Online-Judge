import bcrypt from "bcryptjs";
import { createUser, userExistsWithUsername } from "../queries.js";

export async function registerUser(
	username: string,
	password: string,
): Promise<{ success: boolean; error?: string; message?: string }> {
	if (await userExistsWithUsername(username)) {
		// User already exists
		return {
			success: false,
			error: `User with username: ${username} already exists`,
		};
	}

	const passwordHash = await bcrypt.hash(
		password,
		parseInt(process.env.SALT ?? "10"),
	);
	const userCreated = await createUser(username, passwordHash);

	return { success: userCreated };
}
