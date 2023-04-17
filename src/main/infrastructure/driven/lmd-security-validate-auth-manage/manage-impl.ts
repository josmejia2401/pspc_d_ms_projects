import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { LambdaUtil } from "../../../transversal/utilities/lambda";
import { Constants } from "../../../transversal/constants";
import { Utils } from "../../../transversal/utilities/utils";
import { SecurityValidateAuthManage } from "./manage";

export class SecurityValidateAuthManageImpl implements SecurityValidateAuthManage {

    private readonly logger: any;
    private readonly fnName: string;
    private readonly lambdaClient: LambdaClient;

    constructor(logger: any) {
        this.logger = logger;
        this.fnName = `${Constants.STAGE}-pspc-security-auth-authorizer`;
        this.lambdaClient = new LambdaClient({ region: Constants.REGION });
    }

    async execute(token: string): Promise<any> {
        try {
            const params = {
                FunctionName: this.fnName,
                InvocationType: 'RequestResponse',
                LogType: 'None',
                Payload: Buffer.from(JSON.stringify({
                    lambdaFunction: true,
                    method: "POST",
                    headers: {
                        origin: "0.0.0.0",
                        authorization: `${token}`
                    }
                })),
            };
            const command = new InvokeCommand(params);
            const response = await this.lambdaClient.send(command);
            const payloadBuffer = Utils.Uint8ArrayToString(response.Payload!);
            const payload = Utils.anyToJson(payloadBuffer);
            this.logger.debug(payload);
            return LambdaUtil.getResponseFromPayload(payload);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
