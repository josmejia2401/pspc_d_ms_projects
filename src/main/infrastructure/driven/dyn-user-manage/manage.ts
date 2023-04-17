import { UserDTO, UpdateUserDTO } from "../../../domain/models/user";

export interface UserManage {
    getById(id: string): Promise<UserDTO>;
    getByIdAndStatus(id: string, status: number): Promise<UserDTO>;
    getByUsernameAndPassword(username: string, password: string): Promise<UserDTO>;
    create(payload: UserDTO): Promise<any>;
    update(id: string, payload: UpdateUserDTO): Promise<any>;
    delete(id: string, userId: string): Promise<any>
    getByUsername(username: string): Promise<UserDTO>;
}