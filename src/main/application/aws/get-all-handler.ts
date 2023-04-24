import Joi from "joi";
import {
    getItemAllAdapter
} from "../../infrastructure/driving/aws/get-all-adapter";
import { instrumentLambda } from "../../transversal/http";

export async function getItemAllHanlder(event: any, _context: any) {
    return instrumentLambda(getItemAllAdapter(), event, {
        querySchema: Joi.object({
            lastEvaluatedKey: Joi.string().optional(),
            segment: Joi.number().optional(),
            limit: Joi.number().optional(),
        }).required(),
    });
}