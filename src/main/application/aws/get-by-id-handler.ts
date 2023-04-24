import Joi from "joi";
import {
    getItemByIdAdapter
} from "../../infrastructure/driving/aws/get-by-id-adapter";
import { instrumentLambda } from "../../transversal/http";

export async function getItemByIdHanlder(event: any, _context: any) {
    return instrumentLambda(getItemByIdAdapter(), event, {
        pathSchema: Joi.object({
            id: Joi.string().optional(),
        }).required(),
    });
}