import type { NextFunction, Request, Response } from "express";
import express from "express";
import { queryMaster, querySlave } from "./db.js";

const app = express();
app.use(express.json());

app.post("/read", async (req, res, next) => {
	const { query, values } = req.body;
	console.log(`GOT /read: ${req.body}`);

	try {
		const result = await querySlave(query, values);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

app.post("/create", async (req, res, next) => {
	const { query, values } = req.body;

	try {
		const result = await queryMaster(query, values);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

app.patch("/update", async (req, res, next) => {
	const { query, values } = req.body;

	try {
		const result = await queryMaster(query, values);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

app.delete("/delete", async (req, res, next) => {
	const { query, values } = req.body;

	try {
		const result = await queryMaster(query, values);
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	const statusCode = err.statusCode ?? 500;
	res.status(statusCode).json({ error: err });
});

export default app