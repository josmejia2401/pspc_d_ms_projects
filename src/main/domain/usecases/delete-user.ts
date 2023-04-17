import { OptionsHttp } from "../../transversal/http";

export class DeleteUserUseCase {

    private logger: any;

    constructor(logger: any) {
        this.logger = logger;
    }

    async execute(_options: OptionsHttp) {
        try {
            //Deshabilitar usuarios
            //Eliminar tokens
            return;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}