import Joi from "joi";
import {
    createItemAdapter
} from "../../infrastructure/driving/aws/create-adapter";
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
