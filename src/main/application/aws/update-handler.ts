import Joi from "joi";
import {
    updateItemAdapter
} from "../../infrastructure/driving/aws/update-adapter";
import { instrumentLambda } from "../../transversal/http";

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
