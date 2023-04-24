import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";
import { DeleteItemUseCase } from "../../../domain/usecases/delete-item";


export function deleteItemByIdAdapter(): Fn {
    return async (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> => {
        const { logger } = d;
        try {
            const output = await new DeleteItemUseCase(logger).execute(event.params.id, options);
            return {
                "headers": {},
                "body": output,
                "statusCode": 200,
            };
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}
