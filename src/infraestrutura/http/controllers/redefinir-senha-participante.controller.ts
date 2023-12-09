import { Request, Response } from "express";

import { RedefinirSenhaParticipante } from "@/aplicacao/casos-uso/redefinir-senha-participante.usecase";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";
import { RedefinirSenhaParticipanteDTO } from "@/aplicacao/dto/participante.dto";

type RedefinirSenhaParticipanteControllerParams = {
    useCase: RedefinirSenhaParticipante;
};

class RedefinirSenhaParticipanteController {

    private _useCase: RedefinirSenhaParticipante;

    public constructor(params: RedefinirSenhaParticipanteControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "sucesso",
            texto: "Senha redefinida com sucesso"
        };

        try{
            const dadosRedefinirSenha = req.body as RedefinirSenhaParticipanteDTO;
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

export { RedefinirSenhaParticipanteController };
