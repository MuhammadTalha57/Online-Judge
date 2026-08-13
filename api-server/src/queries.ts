import type { QueryResult, QueryResultRow } from "pg";

async function queryDB<T extends QueryResultRow = any>(
	query: string,
	values: any[],
	operation: "read" | "create" | "update" | "delete",
	method: "GET" | "POST" | "PATCH" | "DELETE",
): Promise<QueryResult<T>> {
	const url = `${process.env.DB_SERVICE_URL}/${operation}`;
	const options = {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: query,
			values: values,
		}),
	};

	console.log(url, options);

	try {
		const result = await fetch(url, options);
		if (!result.ok) {
			throw new Error(`DB Service Error: ${result.statusText}`);
		}
		const data: QueryResult<T> = await result.json();

		console.log(`Got from DB Service:`, data);
		return data;
	} catch (error) {
		console.error(`Failed to query from db service: ${error}`, error);
		throw new Error("Failed to contact DB Service");
	}
}

export async function userExistsWithUsername(
	username: string,
): Promise<boolean> {
	const query = `SELECT COUNT(username) FROM "Users" WHERE username = $1;`;
	const values = [username];

	const result = await queryDB<{ count: string }>(
		query,
		values,
		"read",
		"POST",
	);
	return parseInt(result.rows[0]!.count, 10) > 0;
}

export async function createUser(
	username: string,
	passwordHash: string,
	role: string = "user",
): Promise<boolean> {
	const query = `INSERT INTO "Users" (username, password_hash, role) VALUES ($1, $2, $3) RETURNING *;`;
	const values = [username, passwordHash, role];

	const result = await queryDB<{ username: string }>(
		query,
		values,
		"create",
		"POST",
	);
	return result.rows[0]!.username === username;
}
