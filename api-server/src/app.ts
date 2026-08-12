import express from "express";
import "dotenv/config";
import { RedisStore } from "connect-redis";
import expressSession from "express-session";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const redisClient = createClient({
	url: process.env.REDIS_URL!,
});

redisClient.on("error", (err) => console.error("Redis Clien Error", err));

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

export default app;
