export interface CreateUserInterface {
	username: string;
	password: string;
}

export interface LoginUserInterface {
	username: string;
	password: string;
}

export type User = {
	username: string;
	password_hash: string;
	role: string;
};

declare module 'express-session' {
    interface SessionData {
        username: string,
		role: string,
    }
}