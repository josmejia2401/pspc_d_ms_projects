import { UserManage } from "../../infrastructure/driven/dyn-user-manage/manage";
import { CustomError } from "../../transversal/error";
import { Utils } from "../../transversal/utilities/utils";
import { UserManageImpl } from "../../infrastructure/driven/dyn-user-manage/manage-impl";

export class GetUserByUsernamePasswordUseCase {
    private logger: any;
    private userManage: UserManage;

    constructor(logger: any) {
        this.logger = logger;
        this.userManage = new UserManageImpl(logger);
    }

    async execute(username: string, password: string) {
        try {
            const result: any = await this.userManage.getByUsernameAndPassword(username, password);
            if (Utils.isEmpty(result)) {
                throw new CustomError("data not found", "NOT_FOUND", 404);
            }
            delete result.password;
            return result;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}