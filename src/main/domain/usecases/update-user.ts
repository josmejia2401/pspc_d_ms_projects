import { UpdateUserDTO } from "../models/user";
import { UserManage } from "../../infrastructure/driven/dyn-user-manage/manage";
import { UserManageImpl } from "../../infrastructure/driven/dyn-user-manage/manage-impl";
import { OptionsHttp } from "../../transversal/http";
import { JWT } from "../../transversal/token";

export class UpdateUserUseCase {

    private logger: any;
    private userManage: UserManage;

    constructor(logger: any) {
        this.logger = logger;
        this.userManage = new UserManageImpl(logger);
    }

    async execute(input: UpdateUserDTO, options: OptionsHttp) {
        try {
            const decodedToken = JWT.decodeToken(options.authorization);
            await this.userManage.update(decodedToken?.sub!, {
                email: input.email,
                fullName: input.fullName,
                telephone: input.telephone,
            });
            return input;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}