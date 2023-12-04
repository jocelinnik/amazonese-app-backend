type TipoMensagem = "sucesso" | "erro";

interface Mensagem {
    tipo: TipoMensagem;
    texto: string;
};

export { Mensagem, TipoMensagem };
