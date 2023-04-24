import { GetItemByIdUseCase } from "../../../domain/usecases/find-by-id-item";
import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";

export function getItemByIdAdapter(): Fn {
    return async (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> => {
        const { logger } = d;
        try {
            const output = await new GetItemByIdUseCase(logger).execute(event.params.id, options);
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
