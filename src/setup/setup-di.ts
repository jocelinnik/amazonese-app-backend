import { config } from "dotenv";

import { BuscarEventosPorOrganizador } from "@/aplicacao/casos-uso/buscar-eventos-por-organizador.usecase";
import { CadastrarNovoEvento } from "@/aplicacao/casos-uso/cadastrar-novo-evento.usecase";
import { CadastrarNovoOrganizador } from "@/aplicacao/casos-uso/cadastrar-novo-organizador.usecase";
import { CadastrarNovoParticipante } from "@/aplicacao/casos-uso/cadastrar-novo-participante.usecase";
import { FavoritarEvento } from "@/aplicacao/casos-uso/favoritar-evento.usecase";
import { RealizarLoginOrganizador } from "@/aplicacao/casos-uso/realizar-login-organizador.usecase";
import { RealizarLoginParticipante } from "@/aplicacao/casos-uso/realizar-login-participante.usecase";
import { CifradorSenhas } from "@/aplicacao/providers/cifrador-senhas";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/providers/gerenciador-tokens-autenticacao";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";
import { ContainerDI } from "@/infraestrutura/di/container-di";
import { BuscarEventosPorOrganizadorController } from "@/infraestrutura/http/controllers/buscar-eventos-por-organizador.controller";
import { CadastrarNovoEventoController } from "@/infraestrutura/http/controllers/cadastrar-novo-evento.controller";
import { CadastrarNovoOrganizadorController } from "@/infraestrutura/http/controllers/cadastrar-novo-organizador.controller";
import { CadastrarNovoParticipanteController } from "@/infraestrutura/http/controllers/cadastrar-novo-participante.controller";
import { FavoritarEventoController } from "@/infraestrutura/http/controllers/favoritar-evento.controller";
import { RealizarLoginOrganizadorController } from "@/infraestrutura/http/controllers/realizar-login-organizador.controller";
import { RealizarLoginParticipanteController } from "@/infraestrutura/http/controllers/realizar-login-participante.controller";
import { VerificadorTokenJWT } from "@/infraestrutura/http/middlewares/verificador-token-jwt.middleware";
import { CustomJWTGerenciadorTokenAutenticacao } from "@/infraestrutura/providers/custom-jwt-gerenciador-tokens-autenticacao";
import { CryptoSHA512CifradorSenhas } from "@/infraestrutura/providers/crypto-cifrador-senhas";
import { PrismaEventosRepository } from "@/infraestrutura/repositorios/prisma-eventos.repository";
import { PrismaOrganizadoresRepository } from "@/infraestrutura/repositorios/prisma-organizadores.repository";
import { PrismaParticipantesRepository } from "@/infraestrutura/repositorios/prisma-participantes.repository";

config();

const configurarDependencias = (): void => {
    console.log("Iniciando a configuracao de dependencias da aplicacao...");

    const container = ContainerDI.pegarInstancia();

    // Configurando instâncias de repositório de dados
    // da aplicação...
    container.set("OrganizadoresRepository", new PrismaOrganizadoresRepository());
    container.set("EventosRepository", new PrismaEventosRepository());
    container.set("ParticipantesRepository", new PrismaParticipantesRepository());

    // Configurando instâncias de objetos de serviço
    // da aplicação...
    container.set("CifradorSenhas", (
        new CryptoSHA512CifradorSenhas({
            segredo: process.env.CIFRADOR_SENHAS_SEGREDO as string,
            iteracoes: Number(process.env.CIFRADOR_SENHAS_ITERACOES as string)
        })
    ));
    container.set("GerenciadorTokenAutenticacao", (
        new CustomJWTGerenciadorTokenAutenticacao({
            chave: process.env.JWT_CHAVE as string,
            sub: process.env.JWT_SUB as string,
            tempoVidaToken: Number(process.env.JWT_EXPIRACAO_EM_MINUTOS as string)
        })
    ));

    // Configurando as instâncias de objetos de caso
    // de uso da aplicação...
    container.set("CadastrarNovoOrganizador", (cont: ContainerDI): CadastrarNovoOrganizador => {
        const repository = cont.get("OrganizadoresRepository") as OrganizadoresRepository;
        const cifrador = cont.get("CifradorSenhas") as CifradorSenhas;

        return new CadastrarNovoOrganizador({ repository, cifrador });
    });
    container.set("RealizarLoginOrganizador", (cont: ContainerDI): RealizarLoginOrganizador => {
        const repository = cont.get("OrganizadoresRepository") as OrganizadoresRepository;
        const cifrador = cont.get("CifradorSenhas") as CifradorSenhas;
        const gerenciadorToken = cont.get("GerenciadorTokenAutenticacao") as GerenciadorTokenAutenticacao;

        return new RealizarLoginOrganizador({ cifrador, gerenciadorToken, repository });
    });
    container.set("CadastrarNovoEvento", (cont: ContainerDI): CadastrarNovoEvento => {
        const eventosRepository = cont.get("EventosRepository") as EventosRepository;
        const organizadoresRepository = cont.get("OrganizadoresRepository") as OrganizadoresRepository;

        return new CadastrarNovoEvento({ eventosRepository, organizadoresRepository });
    });
    container.set("BuscarEventosPorOrganizador", (cont: ContainerDI): BuscarEventosPorOrganizador => {
        const eventosRepository = cont.get("EventosRepository") as EventosRepository;
        const organizadoresRepository = cont.get("OrganizadoresRepository") as OrganizadoresRepository;

        return new BuscarEventosPorOrganizador({ eventosRepository, organizadoresRepository });
    });
    container.set("CadastrarNovoParticipante", (cont: ContainerDI): CadastrarNovoParticipante => {
        const cifrador = cont.get("CifradorSenhas") as CifradorSenhas;
        const repository = cont.get("ParticipantesRepository") as ParticipantesRepository;

        return new CadastrarNovoParticipante({ cifrador, repository });
    });
    container.set("RealizarLoginParticipante", (cont: ContainerDI): RealizarLoginParticipante => {
        const repository = cont.get("ParticipantesRepository") as ParticipantesRepository;
        const cifrador = cont.get("CifradorSenhas") as CifradorSenhas;
        const gerenciadorToken = cont.get("GerenciadorTokenAutenticacao") as GerenciadorTokenAutenticacao;

        return new RealizarLoginParticipante({ cifrador, gerenciadorToken, repository });
    });
    container.set("FavoritarEvento", (cont: ContainerDI): FavoritarEvento => {
        const eventosRepository = cont.get("EventosRepository") as EventosRepository;
        const participantesRepository = cont.get("ParticipantesRepository") as ParticipantesRepository;

        return new FavoritarEvento({ eventosRepository, participantesRepository });
    });

    // Configurando as instâncias de objetos middleware
    // HTTP da aplicação...
    container.set("VerificadorTokenJWT", (cont: ContainerDI): VerificadorTokenJWT => {
        const gerenciadorTokens = cont.get("GerenciadorTokenAutenticacao") as GerenciadorTokenAutenticacao;

        return new VerificadorTokenJWT({ gerenciadorTokens });
    });

    // Configurando as instâncias de objetos controllers
    // HTTP da aplicação...
    container.set("CadastrarNovoOrganizadorController", (cont: ContainerDI): CadastrarNovoOrganizadorController => {
        const useCase = cont.get("CadastrarNovoOrganizador") as CadastrarNovoOrganizador;

        return new CadastrarNovoOrganizadorController({ useCase });
    });
    container.set("RealizarLoginOrganizadorController", (cont: ContainerDI): RealizarLoginOrganizadorController => {
        const useCase = cont.get("RealizarLoginOrganizador") as RealizarLoginOrganizador;

        return new RealizarLoginOrganizadorController({ useCase });
    });
    container.set("CadastrarNovoEventoController", (cont: ContainerDI): CadastrarNovoEventoController => {
        const useCase = cont.get("CadastrarNovoEvento") as CadastrarNovoEvento;

        return new CadastrarNovoEventoController({ useCase });
    });
    container.set("BuscarEventosPorOrganizadorController", (cont: ContainerDI): BuscarEventosPorOrganizadorController => {
        const useCase = cont.get("BuscarEventosPorOrganizador") as BuscarEventosPorOrganizador;

        return new BuscarEventosPorOrganizadorController({ useCase });
    });
    container.set("CadastrarNovoParticipanteController", (cont: ContainerDI): CadastrarNovoParticipanteController => {
        const useCase = cont.get("CadastrarNovoParticipante") as CadastrarNovoParticipante;

        return new CadastrarNovoParticipanteController({ useCase });
    });
    container.set("RealizarLoginParticipanteController", (cont: ContainerDI): RealizarLoginParticipanteController => {
        const useCase = cont.get("RealizarLoginParticipante") as RealizarLoginParticipante;

        return new RealizarLoginParticipanteController({ useCase });
    });
    container.set("FavoritarEventoController", (cont: ContainerDI): FavoritarEventoController => {
        const useCase = cont.get("FavoritarEvento") as FavoritarEvento;

        return new FavoritarEventoController({ useCase });
    });
};

export { configurarDependencias };
