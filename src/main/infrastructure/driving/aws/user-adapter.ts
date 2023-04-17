import { CreateUserUseCase } from "../../../domain/usecases/create-user";
import { UpdateUserUseCase } from "../../../domain/usecases/update-user";
import { GetUserByTokenUseCase } from "../../../domain/usecases/get-user-by-token";
import { GetUserByUsernamePasswordUseCase } from "../../../domain/usecases/get-user-by-usr-pass";
import { Fn, HttpRequestEvent, HttpResponseEvent, OptionsHttp } from "../../../transversal/http";
import { DeleteUserUseCase } from "../../../domain/usecases/delete-user";

export function createUserAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, _options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new CreateUserUseCase(logger).execute({
                email: event.body["email"],
                fullName: event.body["fullName"],
                password: event.body["password"],
                telephone: event.body["telephone"],
                username: event.body["username"],
            });
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

export function updateUserAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new UpdateUserUseCase(logger).execute({
                email: event.body["email"],
                fullName: event.body["fullName"],
                telephone: event.body["telephone"]
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

export function getUserByTokenAdapter(): Fn {
    return async function (_event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new GetUserByTokenUseCase(logger).execute(options);
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

export function deleteUserByTokenAdapter(): Fn {
    return async function (_event: HttpRequestEvent, d: any, options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new DeleteUserUseCase(logger).execute(options);
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

export function getUserByUsernamePasswordAdapter(): Fn {
    return async function (event: HttpRequestEvent, d: any, _options: OptionsHttp): Promise<HttpResponseEvent> {
        const { logger } = d;
        try {
            const output = await new GetUserByUsernamePasswordUseCase(logger).execute(
                event.body["username"],
                event.body["password"],
            );
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
