import { Request, Response } from "express";

import { RealizarLoginParticipante } from "@/aplicacao/casos-uso/realizar-login-participante.usecase";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";
import { LoginParticipanteDTO } from "@/aplicacao/dto/participante.dto";

type RealizarLoginParticipanteControllerParams = {
    useCase: RealizarLoginParticipante;
};

class RealizarLoginParticipanteController {

    private _useCase: RealizarLoginParticipante;

    public constructor(params: RealizarLoginParticipanteControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        try{
            const dadosLogin = req.body as LoginParticipanteDTO;
            const token = await this._useCase.executar(dadosLogin);

            res.json(token);
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

export { RealizarLoginParticipanteController };
