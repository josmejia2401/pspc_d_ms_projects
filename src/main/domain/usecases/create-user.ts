import { v4 as uuidv4 } from "uuid";
import { Utils } from "../../transversal/utilities/utils";
import { CustomError } from "../../transversal/error";
import { UserDTO } from "../models/user";
import { Constants } from "../../transversal/constants";
import { UserManage } from "../../infrastructure/driven/dyn-user-manage/manage";
import { UserManageImpl } from "../../infrastructure/driven/dyn-user-manage/manage-impl";

export class CreateUserUseCase {

    private logger: any;
    private userUserManage: UserManage;

    constructor(logger: any) {
        this.logger = logger;
        this.userUserManage = new UserManageImpl(logger);
    }

    async execute(input: UserDTO) {
        try {
            input.createdAt = new Date().toISOString();
            input.id = uuidv4();
            input.status = Constants.STATUS_USER.PENDING_ACTIVATION;
            const usernameResult = await this.userUserManage.getByUsername(input.username);
            if (!Utils.isEmpty(usernameResult)) {
                throw new CustomError("User already exist", "CONFLICT", 409);
            }
            await this.userUserManage.create(input);
            delete (input as any).password;
            return input;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
