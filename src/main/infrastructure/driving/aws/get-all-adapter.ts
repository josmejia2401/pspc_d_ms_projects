import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";
import { GetItemAllUseCase } from "../../../domain/usecases/find-all";

export function getItemAllAdapter(): Fn {
    return async (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> => {
        const { logger } = d;
        try {

            const output = await new GetItemAllUseCase(logger).execute({
                lastEvaluatedKey: event.query.lastEvaluatedKey,
                segment: Number(event.query.segment || 0),
                limit: Number(event.query.limit || 0),
            }, options);
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
