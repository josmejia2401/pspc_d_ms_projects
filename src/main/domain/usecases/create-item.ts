import { v4 as uuidv4 } from "uuid";
import { ItemDTO } from "../models/item";
import { Constants } from "../../transversal/constants";
import { ItemManage } from "../../infrastructure/driven/dyn-item-manage/manage";
import { ItemManageImpl } from "../../infrastructure/driven/dyn-item-manage/manage-impl";
import { OptionsHttp } from "../../transversal/http";
import { Utils } from "../../transversal/utilities/utils";

export class CreateItemUseCase {

    private logger: any;
    private itemManage: ItemManage;

    constructor(logger: any) {
        this.logger = logger;
        this.itemManage = new ItemManageImpl(logger);
    }

    async execute(input: ItemDTO, options: OptionsHttp) {
        try {
            input.createdAt = new Date().toISOString();
            input.id = uuidv4();
            if (Utils.isEmpty(input.status)) {
                input.status = Constants.STATUS_USER.ACTIVE;
            }
            input.userId = options.decodedToken!.sub!;
            await this.itemManage.create(input);
            return input;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
