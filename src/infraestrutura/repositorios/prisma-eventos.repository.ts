import { PrismaClient } from "@prisma/client";

import { Evento } from "@/dominio/modelos/evento.model";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";
import { Organizador } from "@/dominio/modelos/organizador.model";

class PrismaEventosRepository implements EventosRepository {

    private _conexao: PrismaClient;

    public constructor(){
        this._conexao = new PrismaClient({
            log: ["info", "query"]
        });
    }

    public async buscarEventosPorOrganizador(organizador: Organizador): Promise<Evento[]> {
        const dadosEventos = await this._conexao.evento.findMany({
            where: {
                idOrganizador: organizador.id
            }
        });

        return (
            dadosEventos
                .map(evento => (
                    Evento.recuperar({
                        id: evento.id,
                        nome: evento.nome,
                        descricao: evento.descricao,
                        preco: evento.preco.toNumber(),
                        dataInicio: evento.dataInicio,
                        dataFim: evento.dataFim,
                        localidade: {
                            cidade: evento.cidadeEvento,
                            uf: evento.ufEvento
                        },
                        organizador: organizador
                    })
                ))
        );
    }

    public async salvar(evento: Evento): Promise<void> {
        await this._conexao.evento.create({
            data: {
                nome: evento.nome,
                descricao: evento.descricao,
                preco: evento.preco,
                cidadeEvento: evento.localidade.cidade,
                ufEvento: evento.localidade.uf,
                dataInicio: evento.dataInicio,
                dataFim: evento.dataFim,
                idOrganizador: evento.organizador.id
            }
        });
    }
}

export { PrismaEventosRepository };
