import { Pool } from "pg";
import "dotenv/config";

// Write Pool
const writePool = new Pool({
	host: process.env.DB_WRITE_HOST,
	port: 5432,
	user: process.env.POSTGRESQL_WRITE_USER,
	password: process.env.POSTGRESQL_WRITE_USER_PASSWORD,
	database: "OnlineJudgeMasterDB",
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

// Read Pool
const readPool = new Pool({
	host: process.env.DB_READ_HOST,
	port: 5431,
	user: process.env.POSTGRESQL_READ_USER,
	password: process.env.POSTGRESQL_READ_USER_PASSWORD,
	database: "OnlineJudgeMasterDB",
});

export const write = (text: string, params: any[]) => {
	writePool.query(text, params);
};

export const read = (text: string, params: any[]) => {
	readPool.query(text, params);
};
