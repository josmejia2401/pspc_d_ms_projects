import {
    deleteItemByIdAdapter
} from "../../infrastructure/driving/aws/delete-adapter";
import { instrumentLambda } from "../../transversal/http";

export async function deleteItemByIdHandler(event: any, _context: any) {
    return instrumentLambda(deleteItemByIdAdapter(), event);
}
