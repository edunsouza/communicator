function getResposta(publicacao, sentimento) {
    if (!publicacao.texto) return;

    publicacao.usuario = publicacao.usuario || "Cliente";
    var resposta = null;

    // Negativos
    if (sentimento < 0) {
        resposta = getRespostaNegativa(publicacao.texto, publicacao.usuario);
    }
    // Neutros
    if (sentimento == 0) {
        resposta = getRespostaNeutra(publicacao.texto, publicacao.usuario);
    }
    // Positivos
    if (sentimento > 0) {
        resposta = getRespostaPositiva(publicacao.texto, publicacao.usuario);
    }

    publicacao.resposta = resposta;
    return publicacao;
}

function getRespostaNegativa(texto, usuario) {
    if (texto.length > 50) {
        return `Olá, ${usuario}!
        Primeiramente agradecemos o seu comentário, ele é muito importante para nosso crescimento.
        Essa não é a experiência que desejamos para nossos clientes.
        Estamos trabalhando para melhor atender a todos!`;
    } else {
        return `Olá, ${usuario}!
        Nós agradecemos por compartilhar seu feedback.
        Você gostaria de entrar em contato para nos passar mais informações sobre o que está passando?
        Entre em contato pelo número XXXXX-YYYY.
        `;
    }
}

function getRespostaNeutra(texto, usuario) {
    if (texto.length > 50) {
        return `Olá, ${usuario}! Agradecemos o seu comentário.
        Pedimos que continue enviando comentários para que possamos estar sempre atualizados.`;
    } else {
        return `Olá, ${usuario}! Obrigado por compartilhar seu feedback.`;
    }
}

function getRespostaPositiva(texto, usuario) {
    if (texto.length > 50) {
        return `Olá, ${usuario}!
        Ficamos felizes que você tenha compartilhado seu comentário conosco.
        Nós trabalhamos para que você tenha sempre boas experiências.
        Não deixe de compartilhar com a gente o que você pensa!`;
    } else {
        return `Olá, ${usuario}! Agradecemos muito seu comentário.
        Por favor, nos envie mais informações para que possamos melhorar a cada dia.`;
    }
}

this.getResposta = getResposta;
module.exports = this;