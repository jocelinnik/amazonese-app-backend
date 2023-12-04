import { Request, Response } from "express";

import { CadastrarNovoOrganizador } from "@/aplicacao/casos-uso/cadastrar-novo-organizador.usecase";
import { NovoOrganizadorDTO } from "@/aplicacao/dto/organizador.dto";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";

type CadastrarNovoOrganizadorControllerParams = {
    useCase: CadastrarNovoOrganizador;
};

class CadastrarNovoOrganizadorController {

    private _useCase: CadastrarNovoOrganizador;

    public constructor(params: CadastrarNovoOrganizadorControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "sucesso",
            texto: "Organizador de eventos cadastrado com sucesso"
        };

        try{
            const dadosNovoOrganizador = req.body as NovoOrganizadorDTO;
            await this._useCase.executar(dadosNovoOrganizador);
        }catch(e: any){
            const erro = e as Error;

            mensagem.tipo = "erro";
            mensagem.texto = `Falha ao tentar cadastrar um novo organizador de eventos: ${erro.message}`;
        }

        const status = (mensagem.tipo === "sucesso") ? 201 : 400;

        res.status(status).json(mensagem);
    }
}

export { CadastrarNovoOrganizadorController };
