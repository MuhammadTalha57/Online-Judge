import { type Request, type Response, Router } from "express";
import { checkSchema, matchedData } from "express-validator";
import {
	signinController,
	signupController,
} from "../controllers/auth.controller.js";
import { handleValidationErrors } from "../middlewares/schema-validator.middleware.js";
import {
	createUserSchema,
	loginUserSchema,
} from "../schemas/create-user.schema.js";

const authRouter = Router();

authRouter.post(
	"/signup",
	checkSchema(createUserSchema),
	handleValidationErrors,
	signupController,
);

authRouter.post(
	"/signin",
	checkSchema(loginUserSchema),
	handleValidationErrors,
	signinController,
);

export default authRouter;
