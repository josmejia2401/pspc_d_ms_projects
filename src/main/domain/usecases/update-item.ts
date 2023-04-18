import { ItemDTO } from "../models/item";
import { ItemManage } from "../../infrastructure/driven/dyn-item-manage/manage";
import { ItemManageImpl } from "../../infrastructure/driven/dyn-item-manage/manage-impl";
import { OptionsHttp } from "../../transversal/http";

export class UpdateItemUseCase {

    private logger: any;
    private itemManage: ItemManage;

    constructor(logger: any) {
        this.logger = logger;
        this.itemManage = new ItemManageImpl(logger);
    }

    async execute(input: ItemDTO, _options: OptionsHttp) {
        try {
            delete (input as any)["id"];
            await this.itemManage.update(input.id!, input);
            return input;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
