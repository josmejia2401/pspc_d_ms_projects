import { UserManage } from "../../infrastructure/driven/dyn-user-manage/manage";
import { CustomError } from "../../transversal/error";
import { Utils } from "../../transversal/utilities/utils";
import { UserManageImpl } from "../../infrastructure/driven/dyn-user-manage/manage-impl";
import { OptionsHttp } from "../../transversal/http";
import { JWT } from "../../transversal/token";

export class GetUserByTokenUseCase {
    private logger: any;
    private userManage: UserManage;

    constructor(logger: any) {
        this.logger = logger;
        this.userManage = new UserManageImpl(logger);
    }

    async execute(options: OptionsHttp) {
        try {
            const decodedToken = JWT.decodeToken(options.authorization);
            const result: any = await this.userManage.getById(decodedToken?.sub!);
            if (Utils.isEmpty(result)) {
                throw new CustomError("User doesn't have permission to the request resource.", "Forbidden", 403);
            }
            delete result.password;
            return result;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}