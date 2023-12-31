import { PrismaClient } from "@prisma/client";

import { Participante } from "@/dominio/modelos/participante.model";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";
import { Evento } from "@/dominio/modelos/evento.model";

class PrismaParticipantesRepository implements ParticipantesRepository {

    private _conexao: PrismaClient;

    public constructor(){
        this._conexao = new PrismaClient({
            log: ["info", "query"]
        });
    }

    public async buscarPorCpf(cpf: string): Promise<Participante> {
        const dadosParticipante = await this._conexao.participante.findFirst({
            where: {
                cpf: cpf
            }
        });

        if(!dadosParticipante)
            throw new Error(`O CPF ${cpf} não foi encontrado`);

        return Participante.recuperar({
            id: dadosParticipante.id,
            nome: dadosParticipante.nome,
            cpf: dadosParticipante.cpf,
            email: dadosParticipante.email,
            telefone: dadosParticipante.telefone,
            senha: dadosParticipante.senha,
            fraseSecreta: dadosParticipante.fraseSecreta
        });
    }    

    public async salvar(participante: Participante): Promise<void> {
        if(participante.id)
            await this.atualizarParticipante(participante);
        else
            await this.inserirParticipante(participante);
    }
    
    public async favoritarEvento(evento: Evento, participante: Participante): Promise<void> {
        await this._conexao.eventoFavorito.create({
            data: {
                idEvento: evento.id,
                idParticipante: participante.id,
                dataFavorito: new Date()
            }
        });
    }

    private async inserirParticipante(participante: Participante): Promise<void> {
        await this._conexao.participante.create({
            data: {
                nome: participante.nome,
                cpf: participante.cpf,
                email: participante.email,
                telefone: participante.telefone,
                senha: participante.senha,
                fraseSecreta: participante.fraseSecreta
            }
        });
    }

    private async atualizarParticipante(participante: Participante): Promise<void> {
        await this._conexao.participante.update({
            data: {
                nome: participante.nome,
                cpf: participante.cpf,
                email: participante.email,
                telefone: participante.telefone,
                senha: participante.senha,
                fraseSecreta: participante.fraseSecreta
            },
            where: {
                id: participante.id
            }
        });
    }
}

export { PrismaParticipantesRepository };
