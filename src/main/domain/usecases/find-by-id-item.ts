import { OptionsHttp } from "../../transversal/http";
import { ItemManage } from "../../infrastructure/driven/dyn-item-manage/manage";
import { ItemManageImpl } from "../../infrastructure/driven/dyn-item-manage/manage-impl";

export class GetItemByIdUseCase {
    private logger: any;
    private itemManage: ItemManage;

    constructor(logger: any) {
        this.logger = logger;
        this.itemManage = new ItemManageImpl(logger);
    }

    async execute(id: string, options: OptionsHttp) {
        try {
            return await this.itemManage.getById(id, options.decodedToken!.sub!);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}