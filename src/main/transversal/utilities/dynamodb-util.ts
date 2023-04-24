import { Utils } from "./utils";

export class DynamoDbUtil {

    static buildExpressionAttributes(payload: any, keys = [] as any): { expressionAttributeValues: any, expressionAttributeNames: any } {
        if (Utils.isEmpty(keys)) {
            keys = Object.keys(payload);
        }
        const expressionAttributeValues = {} as any;
        const expressionAttributeNames = {} as any;
        for (const key of keys) {
            const value = payload[key]
            if (Utils.isEmpty(value)) {
                continue;
            }
            const typeOf = typeof value;
            expressionAttributeNames[`#${key}`] = key;
            switch (typeOf) {
                case "string":
                    expressionAttributeValues[`:${key}`] = {
                        "S": `${value}`
                    };
                    break;
                case "number":
                    expressionAttributeValues[`:${key}`] = {
                        "N": `${value}`
                    };
                    break;
                case "boolean":
                    expressionAttributeValues[`:${key}`] = {
                        "BOOL": `${value}`
                    };
                    break;
                case "object":
                    expressionAttributeValues[`:${key}`] = {
                        "B": `${value}`
                    };
                    break;
                default:
                    expressionAttributeValues[`:${key}`] = {
                        "S": `${value}`
                    };
            }
        }
        return {
            "expressionAttributeValues": expressionAttributeValues,
            "expressionAttributeNames": expressionAttributeNames,
        }
    }

    static buildInsertObject(payload: any, keys = [] as any) {
        if (Utils.isEmpty(keys)) {
            keys = Object.keys(payload);
        }
        const oputput: any = {};
        for (const key of keys) {
            const value = payload[key]
            if (Utils.isEmpty(value)) {
                continue;
            }
            const typeOf = typeof value;
            switch (typeOf) {
                case "string":
                    oputput[`${key}`] = {
                        "S": `${value}`
                    };
                    break;
                case "number":
                    oputput[`${key}`] = {
                        "N": `${value}`
                    };
                    break;
                case "boolean":
                    oputput[`${key}`] = {
                        "BOOL": `${value}`
                    };
                    break;
                case "object":
                    oputput[`${key}`] = {
                        "B": `${value}`
                    };
                    break;
                default:
                    oputput[`${key}`] = {
                        "S": `${value}`
                    };
            }
        }
        return oputput;
    }

    static resultToObject(payload: any): (any[] | any) {
        if (Utils.isEmpty(payload)) {
            return null;
        }
        if (Array.isArray(payload)) {
            const results = [] as any[];
            for (const p of payload) {
                const out = DynamoDbUtil.resultToObject(p);
                if (!Utils.isEmpty(out)) {
                    results.push(out);
                }
            }
            return results;
        } else {
            const results = {} as any;
            const keys = Object.keys(payload);
            for (const key of keys) {
                const valueAsType = payload[key] || payload[`${key}`];
                if (valueAsType) {
                    const keyValue = Object.keys(valueAsType)[0];
                    const value = valueAsType[keyValue] || valueAsType[`${keyValue}`];
                    results[key] = value;
                }
            }
            return results;
        }
    }

    static buildUpdateExpression(payload: any) {
        const keys = Object.keys(payload);
        let updateExpression = ""
        for (const key of keys) {
            if (Utils.isEmpty(payload[key])) {
                continue;
            }
            if (Utils.isEmpty(updateExpression)) {
                updateExpression += `#${key}=:${key}`;
            } else {
                updateExpression += `, #${key}=:${key}`;
            }
        }
        return `SET ${updateExpression}`;
    }
}
