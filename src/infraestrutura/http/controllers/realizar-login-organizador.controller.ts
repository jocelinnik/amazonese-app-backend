import { Request, Response } from "express";

import { RealizarLoginOrganizador } from "@/aplicacao/casos-uso/realizar-login-organizador.usecase";
import { LoginOrganizadorDTO } from "@/aplicacao/dto/organizador.dto";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";

type RealizarLoginOrganizadorControllerParams = {
    useCase: RealizarLoginOrganizador;
};

class RealizarLoginOrganizadorController {

    private _useCase: RealizarLoginOrganizador;

    public constructor(params: RealizarLoginOrganizadorControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        try{
            const dadosLogin = req.body as LoginOrganizadorDTO;
            const token = await this._useCase.executar(dadosLogin);

            res.status(200).json(token);
        }catch(e: any){
            const erro = e as Error;
            const mensagem: Mensagem = {
                tipo: "erro",
                texto: erro.message
            };

            res.status(401).json(mensagem);
        }
    }
}

export { RealizarLoginOrganizadorController };
