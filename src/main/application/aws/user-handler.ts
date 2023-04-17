import Joi from "joi";
import {
    createUserAdapter,
    getUserByTokenAdapter,
    updateUserAdapter,
    getUserByUsernamePasswordAdapter,
    deleteUserByTokenAdapter,
} from "../../infrastructure/driving/aws/user-adapter";
import { instrumentLambda } from "../../transversal/http";

export async function createUserHandler(event: any, _context: any) {
    return instrumentLambda(createUserAdapter(), event, {
        bodySchema: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(8).required(),
            email: Joi.string().email().required(),
            fullName: Joi.string().required(),
            telephone: Joi.string().required(),
        }).required(),
    });
}

export async function getUserByTokenHandler(event: any, _context: any) {
    return instrumentLambda(getUserByTokenAdapter(), event);
}

export async function updateUserHandler(event: any, _context: any) {
    return instrumentLambda(updateUserAdapter(), event, {
        bodySchema: Joi.object({
            email: Joi.string().email().required(),
            fullName: Joi.string().required(),
            telephone: Joi.string().required(),
        }).required(),
    });
}

export async function deleteUserByTokenHandler(event: any, _context: any) {
    return instrumentLambda(deleteUserByTokenAdapter(), true, event);
}

export async function userGetUsernamePasswordHandler(event: any, _context: any) {
    return instrumentLambda(getUserByUsernamePasswordAdapter(), event, {
        bodySchema: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }).required()
    });
}
