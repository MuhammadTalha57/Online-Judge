import type { NextFunction, Request, Response } from "express";
import express from "express";
import "dotenv/config";
import { RedisStore } from "connect-redis";
import expressSession from "express-session";
import { createClient } from "redis";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());

const redisClient = createClient({
	url: process.env.REDIS_URL!,
});

redisClient.on("error", (err) =>
	console.error("Redis Client Error", process.env.REDIS_URL, err),
);

redisClient.connect().catch(console.error);

app.use(
	expressSession({
		store: new RedisStore({
			client: redisClient,
			prefix: "OnlineJudge:",
		}),
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
		
	}),
);

// Auth route
app.use("/auth", authRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const status = err.status ?? 500;
	res.status(status).json(err);
});

export default app;
