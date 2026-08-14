import { type Request, type Response, Router } from "express";
import { checkSchema, matchedData } from "express-validator";
import {
	signinController,
	signoutController,
	signupController,
} from "../controllers/auth.controller.js";
import { handleValidationErrors } from "../middlewares/schema-validator.middleware.js";
import {
	createUserSchema,
	loginUserSchema,
} from "../schemas/create-user.schema.js";
import { requireAuth, requireNoSession } from "../middlewares/authenticate.middleware.js";

const authRouter = Router();

authRouter.post(
	"/signup",
	checkSchema(createUserSchema),
	handleValidationErrors,
	signupController,
);

authRouter.post(
	"/signin",
	requireNoSession,
	checkSchema(loginUserSchema),
	handleValidationErrors,
	signinController,
);

authRouter.post(
	"/signout",
	requireAuth,
	signoutController,
)

export default authRouter;
