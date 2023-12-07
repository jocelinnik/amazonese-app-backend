import { Request, Response } from "express";

import { BuscarEventosPorLocalidade } from "@/aplicacao/casos-uso/buscar-eventos-por-localidade.usecase";
import { Mensagem } from "@/aplicacao/dto/mensagem.dto";

type BuscarEventosPorLocalidadeControllerParams = {
    useCase: BuscarEventosPorLocalidade;
};

class BuscarEventosPorLocalidadeController {

    private _useCase: BuscarEventosPorLocalidade;

    public constructor(params: BuscarEventosPorLocalidadeControllerParams){
        this._useCase = params.useCase;
    }

    public async executar(req: Request, res: Response): Promise<void> {
        try{
            const { cidade, uf } = req.params;
            const eventos = await this._useCase.executar({ cidade, uf });
            res.status(200).json(eventos);
        }catch(e: any){
            const erro = e as Error;
            const mensagem: Mensagem = {
                tipo: "erro",
                texto: "Tivemos um problema na hora de buscar os eventos. Tente novamente mais tarde"
            };
            
            console.error(erro);
            res.status(500).json(mensagem)
        }
    }
}

export { BuscarEventosPorLocalidadeController };
