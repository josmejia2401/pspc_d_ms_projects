import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";
import { GetItemAllUseCase } from "../../../domain/usecases/find-all";

export function getItemAllAdapter(): Fn {
    return async (_event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> => {
        const { logger } = d;
        try {
            const output = await new GetItemAllUseCase(logger).execute(options);
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
