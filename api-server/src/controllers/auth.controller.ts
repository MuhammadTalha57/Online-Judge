import type { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { loginUser, registerUser } from "../services/auth.service.js";
import type { CreateUserInterface, LoginUserInterface } from "../types/user.js";

export async function signupController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		// Validated Data through middleware
		const data = matchedData(req) as CreateUserInterface;
		const { username, password } = data;
		const { success, error, message } = await registerUser(username, password);
		if (success) {
			res.status(201).json({ success, message });
		} else {
			res.status(400).json({ success, error });
		}
	} catch (error) {
		next(error);
	}
}

export async function signinController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		// Validated Data through middleware
		const data = matchedData(req) as LoginUserInterface;
		const { username, password } = data;
		const { success, error, message, user } = await loginUser(
			username,
			password,
		);
		if (success) {
			// Generate Session
			req.session.regenerate((err) => {
				if(err) {
					return res.status(500).send("Could not generate session");
				}

				req.session.user = {
					username: user!.username,
					role: user!.role,
				}	

				req.session.save((err) => {
					if(err) {
						return res.status(500).send("Could not save session");
					}
				})
				return res.status(200).json({ success, message, user });
			})

		} else {
			res.status(401).json({ success, error, user });
		}
	} catch (error) {
		next(error);
	}
}
