import { Request, Response } from "express";

import { FavoritarEvento } from "@/aplicacao/casos-uso/favoritar-evento.usecase";
import { EventoParaFavoritarDTO } from "@/aplicacao/dto/evento.dto";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";

type FavoritarEventoControllerParams = {
    useCase: FavoritarEvento;
};

class FavoritarEventoController {

    private _useCase: FavoritarEvento;

    public constructor(params: FavoritarEventoControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        const mensagem: Mensagem = {
            tipo: "sucesso",
            texto: "Evento favoritado com sucesso"
        };

        try{
            const dadosEventoParaFavoritar = req.body as EventoParaFavoritarDTO;
            await this._useCase.executar(dadosEventoParaFavoritar);
        }catch(e: any){
            const erro = e as Error;

            mensagem.tipo = "erro";
            mensagem.texto = `Falha ao tentar favoritar o evento: ${erro.message}`;
        }

        const status = (mensagem.tipo === "sucesso") ? 201 : 400;

        res.status(status).json(mensagem);
    }
}

export { FavoritarEventoController };
