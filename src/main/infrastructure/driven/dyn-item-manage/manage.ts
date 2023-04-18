import { ItemDTO } from "../../../domain/models/item";

export interface ItemManage {
    getById(id: string, userId: string): Promise<ItemDTO>;
    getByIdAndStatus(id: string, status: number): Promise<ItemDTO>;
    create(payload: ItemDTO): Promise<any>;
    update(id: string, payload: ItemDTO): Promise<any>;
    delete(id: string, userId: string): Promise<any>
    getByUserId(userId: string): Promise<ItemDTO[]>;
}