import type { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { registerUser } from "../services/auth.service.js";
import type { CreateUserInterface } from "../types/user.js";

export async function signupController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// Validated Data through middleware

	try {
		const data = matchedData(req) as CreateUserInterface;
		const { username, password } = data;
		const {success, error, message} = await registerUser(username, password);
		if(success) {
			res.status(201).json({success, message});
		} else {
			res.status(400).json({success, error});
		}
	} catch (error) {
		next(error);
	}
}
