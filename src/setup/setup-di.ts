import { config } from "dotenv";

import { BuscarEventosPorLocalidade } from "@/aplicacao/casos-uso/buscar-eventos-por-localidade.usecase";
import { BuscarEventosPorOrganizador } from "@/aplicacao/casos-uso/buscar-eventos-por-organizador.usecase";
import { BuscarEventosProximos } from "@/aplicacao/casos-uso/buscar-eventos-proximos.usecase";
import { CadastrarNovoEvento } from "@/aplicacao/casos-uso/cadastrar-novo-evento.usecase";
import { CadastrarNovoOrganizador } from "@/aplicacao/casos-uso/cadastrar-novo-organizador.usecase";
import { CadastrarNovoParticipante } from "@/aplicacao/casos-uso/cadastrar-novo-participante.usecase";
import { FavoritarEvento } from "@/aplicacao/casos-uso/favoritar-evento.usecase";
import { RealizarLoginOrganizador } from "@/aplicacao/casos-uso/realizar-login-organizador.usecase";
import { RealizarLoginParticipante } from "@/aplicacao/casos-uso/realizar-login-participante.usecase";
import { RedefinirSenhaOrganizador } from "@/aplicacao/casos-uso/redefinir-senha-organizador.usecase";
import { RedefinirSenhaParticipante } from "@/aplicacao/casos-uso/redefinir-senha-participante.usecase";
import { CifradorSegredos } from "@/aplicacao/providers/cifrador-segredos";
import { GerenciadorTokenAutenticacao } from "@/aplicacao/providers/gerenciador-tokens-autenticacao";
import { EventosRepository } from "@/dominio/repositorios/eventos.repository";
import { OrganizadoresRepository } from "@/dominio/repositorios/organizadores.repository";
import { ParticipantesRepository } from "@/dominio/repositorios/participantes.repository";
import { ContainerDI } from "@/infraestrutura/di/container-di";
import { BuscarEventosPorLocalidadeController } from "@/infraestrutura/http/controllers/buscar-eventos-por-localidade.controller";
import { BuscarEventosPorOrganizadorController } from "@/infraestrutura/http/controllers/buscar-eventos-por-organizador.controller";
import { BuscarEventosProximosController } from "@/infraestrutura/http/controllers/buscar-eventos-proximos.controller";
import { CadastrarNovoEventoController } from "@/infraestrutura/http/controllers/cadastrar-novo-evento.controller";
import { CadastrarNovoOrganizadorController } from "@/infraestrutura/http/controllers/cadastrar-novo-organizador.controller";
import { CadastrarNovoParticipanteController } from "@/infraestrutura/http/controllers/cadastrar-novo-participante.controller";
import { FavoritarEventoController } from "@/infraestrutura/http/controllers/favoritar-evento.controller";
import { RealizarLoginOrganizadorController } from "@/infraestrutura/http/controllers/realizar-login-organizador.controller";
import { RealizarLoginParticipanteController } from "@/infraestrutura/http/controllers/realizar-login-participante.controller";
import { RedefinirSenhaOrganizadorController } from "@/infraestrutura/http/controllers/redefinir-senha-organizador.controller";
import { RedefinirSenhaParticipanteController } from "@/infraestrutura/http/controllers/redefinir-senha-participante.controller";
import { VerificadorTokenJWT } from "@/infraestrutura/http/middlewares/verificador-token-jwt.middleware";
import { CustomJWTGerenciadorTokenAutenticacao } from "@/infraestrutura/providers/custom-jwt-gerenciador-tokens-autenticacao";
import { CryptoCifradorSegredos } from "@/infraestrutura/providers/crypto-cifrador-segredos";
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
        new CryptoCifradorSegredos({
            algoritmo: process.env.CIFRADOR_SENHAS_ALGORITMO as string,
            segredo: process.env.CIFRADOR_SENHAS_SEGREDO as string,
            iteracoes: Number(process.env.CIFRADOR_SENHAS_ITERACOES as string)
        })
    ));
    container.set("CifradorFrasesSecretas", (
        new CryptoCifradorSegredos({
            algoritmo: process.env.CIFRADOR_FRASES_SECRETAS_ALGORITMO as string,
            segredo: process.env.CIFRADOR_FRASES_SECRETAS_SEGREDO as string,
            iteracoes: Number(process.env.CIFRADOR_FRASES_SECRETAS_ITERACOES as string)
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
        const repository = cont.get<OrganizadoresRepository>("OrganizadoresRepository");
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const cifradorFraseSecreta = cont.get<CifradorSegredos>("CifradorFrasesSecretas");

        return new CadastrarNovoOrganizador({ repository, cifradorSenha, cifradorFraseSecreta });
    });
    container.set("RealizarLoginOrganizador", (cont: ContainerDI): RealizarLoginOrganizador => {
        const repository = cont.get<OrganizadoresRepository>("OrganizadoresRepository");
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const gerenciadorToken = cont.get<GerenciadorTokenAutenticacao>("GerenciadorTokenAutenticacao");

        return new RealizarLoginOrganizador({ cifradorSenha, gerenciadorToken, repository });
    });
    container.set("CadastrarNovoEvento", (cont: ContainerDI): CadastrarNovoEvento => {
        const eventosRepository = cont.get<EventosRepository>("EventosRepository");
        const organizadoresRepository = cont.get<OrganizadoresRepository>("OrganizadoresRepository");

        return new CadastrarNovoEvento({ eventosRepository, organizadoresRepository });
    });
    container.set("BuscarEventosPorOrganizador", (cont: ContainerDI): BuscarEventosPorOrganizador => {
        const eventosRepository = cont.get<EventosRepository>("EventosRepository");
        const organizadoresRepository = cont.get<OrganizadoresRepository>("OrganizadoresRepository");

        return new BuscarEventosPorOrganizador({ eventosRepository, organizadoresRepository });
    });
    container.set("CadastrarNovoParticipante", (cont: ContainerDI): CadastrarNovoParticipante => {
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const cifradorFraseSecreta = cont.get<CifradorSegredos>("CifradorFrasesSecretas");
        const repository = cont.get<ParticipantesRepository>("ParticipantesRepository");

        return new CadastrarNovoParticipante({ cifradorSenha, cifradorFraseSecreta, repository });
    });
    container.set("RealizarLoginParticipante", (cont: ContainerDI): RealizarLoginParticipante => {
        const repository = cont.get<ParticipantesRepository>("ParticipantesRepository");
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const gerenciadorToken = cont.get<GerenciadorTokenAutenticacao>("GerenciadorTokenAutenticacao");

        return new RealizarLoginParticipante({ cifradorSenha, gerenciadorToken, repository });
    });
    container.set("FavoritarEvento", (cont: ContainerDI): FavoritarEvento => {
        const eventosRepository = cont.get<EventosRepository>("EventosRepository");
        const participantesRepository = cont.get<ParticipantesRepository>("ParticipantesRepository");

        return new FavoritarEvento({ eventosRepository, participantesRepository });
    });
    container.set("BuscarEventosPorLocalidade", (cont: ContainerDI): BuscarEventosPorLocalidade => {
        const repository = cont.get<EventosRepository>("EventosRepository");

        return new BuscarEventosPorLocalidade({ repository });
    });
    container.set("BuscarEventosProximos", (cont: ContainerDI): BuscarEventosProximos => {
        const repository = cont.get<EventosRepository>("EventosRepository");

        return new BuscarEventosProximos({ repository });
    });
    container.set("RedefinirSenhaOrganizador", (cont: ContainerDI): RedefinirSenhaOrganizador => {
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const cifradorFraseSecreta = cont.get<CifradorSegredos>("CifradorFrasesSecretas");
        const repository = cont.get<OrganizadoresRepository>("OrganizadoresRepository");

        return new RedefinirSenhaOrganizador({ cifradorSenha, cifradorFraseSecreta, repository });
    });
    container.set("RedefinirSenhaParticipante", (cont: ContainerDI): RedefinirSenhaParticipante => {
        const cifradorSenha = cont.get<CifradorSegredos>("CifradorSenhas");
        const cifradorFraseSecreta = cont.get<CifradorSegredos>("CifradorFrasesSecretas");
        const repository = cont.get<ParticipantesRepository>("ParticipantesRepository");

        return new RedefinirSenhaParticipante({ cifradorSenha, cifradorFraseSecreta, repository });
    });

    // Configurando as instâncias de objetos middleware
    // HTTP da aplicação...
    container.set("VerificadorTokenJWT", (cont: ContainerDI): VerificadorTokenJWT => {
        const gerenciadorTokens = cont.get<GerenciadorTokenAutenticacao>("GerenciadorTokenAutenticacao");

        return new VerificadorTokenJWT({ gerenciadorTokens });
    });

    // Configurando as instâncias de objetos controllers
    // HTTP da aplicação...
    container.set("CadastrarNovoOrganizadorController", (cont: ContainerDI): CadastrarNovoOrganizadorController => {
        const useCase = cont.get<CadastrarNovoOrganizador>("CadastrarNovoOrganizador");

        return new CadastrarNovoOrganizadorController({ useCase });
    });
    container.set("RealizarLoginOrganizadorController", (cont: ContainerDI): RealizarLoginOrganizadorController => {
        const useCase = cont.get<RealizarLoginOrganizador>("RealizarLoginOrganizador");

        return new RealizarLoginOrganizadorController({ useCase });
    });
    container.set("CadastrarNovoEventoController", (cont: ContainerDI): CadastrarNovoEventoController => {
        const useCase = cont.get<CadastrarNovoEvento>("CadastrarNovoEvento");

        return new CadastrarNovoEventoController({ useCase });
    });
    container.set("BuscarEventosPorOrganizadorController", (cont: ContainerDI): BuscarEventosPorOrganizadorController => {
        const useCase = cont.get<BuscarEventosPorOrganizador>("BuscarEventosPorOrganizador");

        return new BuscarEventosPorOrganizadorController({ useCase });
    });
    container.set("CadastrarNovoParticipanteController", (cont: ContainerDI): CadastrarNovoParticipanteController => {
        const useCase = cont.get<CadastrarNovoParticipante>("CadastrarNovoParticipante");

        return new CadastrarNovoParticipanteController({ useCase });
    });
    container.set("RealizarLoginParticipanteController", (cont: ContainerDI): RealizarLoginParticipanteController => {
        const useCase = cont.get<RealizarLoginParticipante>("RealizarLoginParticipante");

        return new RealizarLoginParticipanteController({ useCase });
    });
    container.set("FavoritarEventoController", (cont: ContainerDI): FavoritarEventoController => {
        const useCase = cont.get<FavoritarEvento>("FavoritarEvento");

        return new FavoritarEventoController({ useCase });
    });
    container.set("BuscarEventosPorLocalidadeController", (cont: ContainerDI): BuscarEventosPorLocalidadeController => {
        const useCase = cont.get<BuscarEventosPorLocalidade>("BuscarEventosPorLocalidade");

        return new BuscarEventosPorLocalidadeController({ useCase });
    });
    container.set("BuscarEventosProximosController", (cont: ContainerDI): BuscarEventosProximosController => {
        const useCase = cont.get<BuscarEventosProximos>("BuscarEventosProximos");

        return new BuscarEventosProximosController({ useCase });
    });
    container.set("RedefinirSenhaOrganizadorController", (cont: ContainerDI): RedefinirSenhaOrganizadorController => {
        const useCase = cont.get<RedefinirSenhaOrganizador>("RedefinirSenhaOrganizador");

        return new RedefinirSenhaOrganizadorController({ useCase });
    });
    container.set("RedefinirSenhaParticipanteController", (cont: ContainerDI): RedefinirSenhaParticipanteController => {
        const useCase = cont.get<RedefinirSenhaParticipante>("RedefinirSenhaParticipante");

        return new RedefinirSenhaParticipanteController({ useCase });
    });
};

export { configurarDependencias };
