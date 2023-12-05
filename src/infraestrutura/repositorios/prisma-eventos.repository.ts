import { PrismaClient } from "@prisma/client";

import { Evento } from "@/dominio/modelos/evento.model";
import { Organizador } from "@/dominio/modelos/organizador.model";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";

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
            },
            include: {
                categorias: true,
                organizador: true
            }
        });

        return dadosEventos.map(evento => this.hidratarEvento(evento));
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
                idOrganizador: evento.organizador.id,
                categorias: {
                    create: evento.categorias.map(cat => ({ categoria: cat }))
                }
            }
        });
    }

    public async buscarPorId(id: string): Promise<Evento> {
        const dadosEvento = await this._conexao.evento.findFirst({
            where: {
                id: id
            },
            include: {
                categorias: true,
                organizador: true
            }
        });

        if(!dadosEvento)
            throw new Error(`O evento com ID ${id} não foi encontrado`);

        return this.hidratarEvento(dadosEvento);
    }

    private hidratarEvento(evento): Evento {
        return Evento.recuperar({
            id: evento.id,
            nome: evento.nome,
            descricao: evento.descricao,
            preco: evento.preco.toNumber(),
            dataInicio: evento.dataInicio,
            dataFim: evento.dataFim,
            categorias: evento.categorias.map(cat => cat.categoria),
            localidade: {
                cidade: evento.cidadeEvento,
                uf: evento.ufEvento
            },
            organizador: evento.organizador
        });
    }
}

export { PrismaEventosRepository };
