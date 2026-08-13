import { type Request, type Response, Router } from "express";
import { checkSchema, matchedData } from "express-validator";
import { signupController } from "../controllers/auth.controller.js";
import { handleValidationErrors } from "../middlewares/schema-validator.middleware.js";
import createUserSchema from "../schemas/create-user.schema.js";

const authRouter = Router();

authRouter.post(
	"/signup",
	checkSchema(createUserSchema),
	handleValidationErrors,
	signupController,
);

export default authRouter;
