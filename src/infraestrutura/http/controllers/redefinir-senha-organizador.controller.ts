import { Request, Response } from "express";

import { RedefinirSenhaOrganizador } from "@/aplicacao/casos-uso/redefinir-senha-organizador.usecase";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";
import { RedefinirSenhaOrganizadorDTO } from "@/aplicacao/dto/organizador.dto";

type RedefinirSenhaOrganizadorControllerParams = {
    useCase: RedefinirSenhaOrganizador;
};

class RedefinirSenhaOrganizadorController {

    private _useCase: RedefinirSenhaOrganizador;

    public constructor(params: RedefinirSenhaOrganizadorControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "sucesso",
            texto: "Senha redefinida com sucesso"
        };

        try{
            const dadosRedefinirSenha = req.body as RedefinirSenhaOrganizadorDTO;
            await this._useCase.executar(dadosRedefinirSenha);
        }catch(e: any){
            const erro = e as Error;

            mensagem.tipo = "erro";
            mensagem.texto = erro.message;
        }

        const status = (mensagem.tipo === "sucesso") ? 200 : 400;

        res.status(status).json(mensagem);
    }
}

export { RedefinirSenhaOrganizadorController };
