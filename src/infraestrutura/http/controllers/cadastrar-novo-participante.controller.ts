import { Request, Response } from "express";

import { CadastrarNovoParticipante } from "@/aplicacao/casos-uso/cadastrar-novo-participante.usecase";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";
import { NovoParticipanteDTO } from "@/aplicacao/dto/participante.dto";

type CadastrarNovoParticipanteControllerParams = {
    useCase: CadastrarNovoParticipante;
};

class CadastrarNovoParticipanteController {

    private _useCase: CadastrarNovoParticipante;

    public constructor(params: CadastrarNovoParticipanteControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "sucesso",
            texto: "Seu cadastro foi concluído com sucesso"
        };

        try{
            const dadosNovoParticipante = req.body as NovoParticipanteDTO;
            await this._useCase.executar(dadosNovoParticipante);
        }catch(e: any){
            const erro = e as Error;

            mensagem.tipo = "erro";
            mensagem.texto = `Falha ao tentar criar o perfil: ${erro.message}`;
        }

        const status = (mensagem.tipo === "sucesso") ? 201 : 400;

        res.status(status).json(mensagem);
    }
}

export { CadastrarNovoParticipanteController };
