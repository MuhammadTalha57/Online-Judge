import bcrypt from "bcryptjs";
import { createUser, getUser, userExistsWithUsername } from "../queries.js";
import type { User } from "../types/user.js";

export async function registerUser(
	username: string,
	password: string,
): Promise<{
	success: boolean;
	error?: string;
	message?: string;
}> {
	if (await userExistsWithUsername(username)) {
		// User already exists
		return {
			success: false,
			error: `User with username: ${username} already exists`,
		};
	}

	const passwordHash = await bcrypt.hash(
		password,
		parseInt(process.env.SALT ?? "10", 10),
	);
	const userCreated = await createUser(username, passwordHash);

	return { success: userCreated };
}

export async function loginUser(
	username: string,
	password: string,
): Promise<{
	success: boolean;
	error?: string;
	message?: string;
	user?: User;
}> {
	const user = await getUser(username);
	if (!user) {
		return {
			success: false,
			error: "Username or Password is incorrect",
		};
	}

	const success = await bcrypt.compare(password, user.password_hash);
	if (success) {
		return {
			success: true,
			message: "Username and Password is correct",
			user: user,
		};
	}
	return {
		success: false,
		error: "Username or Password is incorrect",
	};
}
