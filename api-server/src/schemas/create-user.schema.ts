import type { Schema } from "express-validator";

const createUserSchema: Schema = {
    username: {
        in: ["body"],
        trim: true,
        isAlphanumeric: true,
        notEmpty: true
    },
    password: {
        in: ["body"],
        isStrongPassword: true
    }
};

export default createUserSchema