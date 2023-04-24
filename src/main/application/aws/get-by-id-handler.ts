import {
    getItemByIdAdapter
} from "../../infrastructure/driving/aws/get-by-id-adapter";
import { instrumentLambda } from "../../transversal/http";

export async function getItemByIdHanlder(event: any, _context: any) {
    return instrumentLambda(getItemByIdAdapter(), event);
}