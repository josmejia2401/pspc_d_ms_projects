import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const { PutItemCommand, QueryCommand, DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
import { UserDTO, UpdateUserDTO } from "../../../domain/models/user";
import { Constants } from "../../../transversal/constants";
import { DynamoDbUtil } from "../../../transversal/utilities/dynamodb-util";
import { UserManage } from "./manage";

export class UserManageImpl implements UserManage {

    private readonly connection: DynamoDBClient;
    private logger: any;

    constructor(logger: any) {
        this.logger = logger;
        this.connection = new DynamoDBClient({ region: Constants.REGION });
    }

    async getById(id: string): Promise<UserDTO> {
        try {
            const params = {
                TableName: Constants.AWS_DYNAMODB.DYNDB_USERS_TBL,
                KeyConditionExpression: "#id=:id",
                ExpressionAttributeValues: {
                    ":id": {
                        "S": `${id}`
                    }
                },
                ExpressionAttributeNames: {
                    "#id": "id",
                },
            };
            const result: any = await this.connection.send(new QueryCommand(params));
            return DynamoDbUtil.resultToObject(result["Items"][0]);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async getByIdAndStatus(id: string, status: number): Promise<UserDTO> {
        try {
            const params = {
                TableName: Constants.AWS_DYNAMODB.DYNDB_USERS_TBL,
                KeyConditionExpression: "#id=:id",
                FilterExpression: "#status=:status",
                ExpressionAttributeValues: {
                    ":id": {
                        "S": `${id}`
                    },
                    ":status": {
                        "N": `${status}`
                    }
                },
                ExpressionAttributeNames: {
                    "#id": "id",
                    "#status": "status"
                },
            };
            const result: any = await this.connection.send(new QueryCommand(params));
            return DynamoDbUtil.resultToObject(result["Items"][0]);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }


    async getByUsernameAndPassword(username: string, password: string): Promise<UserDTO> {
        try {
            const params = {
                TableName: Constants.AWS_DYNAMODB.DYNDB_USERS_TBL,
                IndexName: "UsernameIndex",
                KeyConditionExpression: "#username=:username",
                FilterExpression: "#password=:password",
                ExpressionAttributeValues: {
                    ":username": {
                        "S": `${username}`
                    },
                    ":password": {
                        "S": `${password}`
                    }
                },
                ExpressionAttributeNames: {
                    "#username": "username",
                    "#password": "password"
                },
            };
            const result: any = await this.connection.send(new QueryCommand(params));
            return DynamoDbUtil.resultToObject(result["Items"][0]);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async create(payload: UserDTO) {
        try {
            const attributes = DynamoDbUtil.buildInsertObject(payload);
            const params = {
                TableName: Constants.AWS_DYNAMODB.DYNDB_USERS_TBL,
                Item: attributes,
                ConditionExpression: 'attribute_not_exists(username)'
            } as any;
            return await this.connection.send(new PutItemCommand(params));
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async update(id: string, payload: UpdateUserDTO): Promise<any> {
        try {
            const attributes = DynamoDbUtil.buildExpressionAttributes(payload);
            const update_expression = DynamoDbUtil.buildUpdateExpression(payload);
            const params = {
                TableName: Constants.AWS_DYNAMODB.DYNDB_USERS_TBL,
                Key: {
                    "id": { "S": id }
                },
                UpdateExpression: update_expression,
                ExpressionAttributeValues: attributes.expressionAttributeValues,
                ExpressionAttributeNames: attributes.expressionAttributeNames,
                ReturnValues: "UPDATED_NEW"
            };
            return await this.connection.send(new UpdateItemCommand(params));
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async delete(id: string, userId: string): Promise<any> {
        try {
            const params = {
                TableName: Constants.AWS_DYNAMODB.DYNDB_USERS_TBL,
                Key: {
                    "id": { "S": id }
                },
                ConditionExpression: "#userId=:userId",
                ExpressionAttributeValues: {
                    ":userId": {
                        "S": `${userId}`
                    }
                },
                ExpressionAttributeNames: {
                    "#userId": "userId"
                },
            } as any;
            return await this.connection.send(new DeleteItemCommand(params));
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
    async getByUsername(username: string): Promise<UserDTO> {
        try {
            const params = {
                TableName: Constants.AWS_DYNAMODB.DYNDB_USERS_TBL,
                IndexName: "UsernameIndex",
                KeyConditionExpression: "#username=:username",
                ExpressionAttributeValues: {
                    ":username": {
                        "S": `${username}`
                    }
                },
                ExpressionAttributeNames: {
                    "#username": "username",
                },
            };
            const result: any = await this.connection.send(new QueryCommand(params));
            return DynamoDbUtil.resultToObject(result["Items"][0]);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
