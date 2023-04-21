import { CreateItemUseCase } from "../../../domain/usecases/create-item";
import { UpdateItemUseCase } from "../../../domain/usecases/update-item";
import { GetItemByIdUseCase } from "../../../domain/usecases/find-by-id-item";
import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";
import { DeleteItemUseCase } from "../../../domain/usecases/delete-item";
import { GetItemAllUseCase } from "../../../domain/usecases/find-all";

export function createItemAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new CreateItemUseCase(logger).execute({
                description: event.body["description"],
                name: event.body["name"],
                startedAt: event.body["startedAt"] || "",
                completedAt: event.body["completedAt"] || "",
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

export function updateItemAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new UpdateItemUseCase(logger).execute({
                description: event.body["description"],
                name: event.body["name"],
                status: event.body["status"],
                id: event.params["id"],
                startedAt: event.body["startedAt"] || "",
                completedAt: event.body["completedAt"] || "",
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

export function getItemByIdAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new GetItemByIdUseCase(logger).execute(event.params["id"], options);
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

export function getItemAllAdapter(): Fn {
    return async function (_event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
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

export function deleteItemByIdAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new DeleteItemUseCase(logger).execute(event.params["id"], options);
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
