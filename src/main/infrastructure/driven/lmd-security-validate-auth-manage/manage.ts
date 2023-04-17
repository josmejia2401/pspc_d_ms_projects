export interface SecurityValidateAuthManage {
    execute(token: string): Promise<any>;
}