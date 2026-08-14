import type { NextFunction, Request, Response } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if(!req.session || !req.session.user) {
       return res.status(401).send("Unauthorized") 
    }
    next();
}

export function requireRoles(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.session.user;

        if(!user) {
           return res.status(401).send("Unauthorized");
        }

        if(!allowedRoles.includes(user.role)) {
            return res.status(403).send("Forbidden");
        }

        next();
    }
}

export function requireNoSession(req: Request, res: Response, next: NextFunction) {
    if(req.session && req.session.user) {
       return res.status(403).send("Forbidden: User already logged in") 
    }
    next();
}