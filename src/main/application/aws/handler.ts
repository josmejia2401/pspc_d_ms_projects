import Joi from "joi";
import {
    createItemAdapter,
    updateItemAdapter,
    getItemAllAdapter,
    getItemByIdAdapter,
    deleteItemByIdAdapter
} from "../../infrastructure/driving/aws/adapter";
import { instrumentLambda } from "../../transversal/http";

export async function createItemHandler(event: any, _context: any) {
    return instrumentLambda(createItemAdapter(), event, {
        bodySchema: Joi.object({
            description: Joi.string().required(),
            name: Joi.string().required(),
            startedAt: Joi.date().optional(),
            completedAt: Joi.date().optional(),
            status: Joi.number().optional(),
        }).required(),
    });
}

export async function updateItemHandler(event: any, _context: any) {
    return instrumentLambda(updateItemAdapter(), event, {
        bodySchema: Joi.object({
            description: Joi.string().required(),
            name: Joi.string().required(),
            status: Joi.number().optional(),
            startedAt: Joi.date().optional(),
            completedAt: Joi.date().optional(),
        }).required(),
        pathSchema: Joi.object({
            id: Joi.string().required(),
        }).required(),
    });
}

export async function getItemByIdHanlder(event: any, _context: any) {
    return instrumentLambda(getItemByIdAdapter(), event);
}

export async function getItemAllHanlder(event: any, _context: any) {
    return instrumentLambda(getItemAllAdapter(), event);
}

export async function deleteItemByIdHandler(event: any, _context: any) {
    return instrumentLambda(deleteItemByIdAdapter(), event);
}
