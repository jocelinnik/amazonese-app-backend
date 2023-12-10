import { Request, Response } from "express";

import { BuscarEventosFavoritosParticipante } from "@/aplicacao/casos-uso/buscar-eventos-favoritos-participante.usecase";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";

type BuscarEventosFavoritosParticipanteControllerParams = {
    useCase: BuscarEventosFavoritosParticipante;
};

class BuscarEventosFavoritosParticipanteController {

    private _useCase: BuscarEventosFavoritosParticipante;

    public constructor(params: BuscarEventosFavoritosParticipanteControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        try{
            const { cpf_participante } = req.params;
            const eventos = await this._useCase.executar({ cpf_participante });
            res.status(200).json(eventos);
        }catch(e: any){
            const erro = e as Error;
            const mensagem: Mensagem = {
                tipo: "erro",
                texto: "Tivemos um problema na hora de buscar os eventos. Tente novamente mais tarde"
            };

            console.error(erro);
            res.status(500).json(mensagem);
        }
    }
}

export { BuscarEventosFavoritosParticipanteController };
