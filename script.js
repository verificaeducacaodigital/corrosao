
const perguntas = [
    {
        pergunta: "1. O que é a ferrugem?",
        opcoes: [
            "Uma reação de corrosão do ferro",
            "Uma camada de plástico",
            "Uma transformação física do ferro",
            "Uma reação de congelamento"
        ],
        correta: 0,
        explicacao: "A ferrugem é formada pela corrosão do ferro, envolvendo reações de oxidação."
    },

    {
        pergunta: "2. Quais elementos são fundamentais para a corrosão atmosférica do ferro?",
        opcoes: [
            "Nitrogênio e gás hélio",
            "Água e oxigênio",
            "Gás carbônico e hélio",
            "Hidrogênio e nitrogênio"
        ],
        correta: 1,
        explicacao: "A água e o oxigênio participam do processo eletroquímico de corrosão do ferro."
    },

    {
        pergunta: "3. O que acontece com o ferro durante a oxidação?",
        opcoes: [
            "Ele recebe elétrons",
            "Ele perde elétrons",
            "Ele deixa de ser um metal",
            "Ele se transforma em zinco"
        ],
        correta: 1,
        explicacao: "Oxidação é a perda de elétrons. O ferro forma íons Fe²⁺ ao perder elétrons."
    },

    {
        pergunta: "4. Qual é a função do zinco na galvanização?",
        opcoes: [
            "Aumentar o contato do ferro com a água",
            "Facilitar a formação de ferrugem",
            "Proteger o ferro contra a corrosão",
            "Transformar o ferro em plástico"
        ],
        correta: 2,
        explicacao: "O zinco funciona como revestimento protetor e pode atuar como ânodo de sacrifício."
    },

    {
        pergunta: "5. Qual alternativa apresenta uma técnica de proteção catódica?",
        opcoes: [
            "Utilizar um metal de sacrifício",
            "Molhar constantemente o ferro",
            "Retirar toda a camada protetora",
            "Aumentar a exposição ao oxigênio"
        ],
        correta: 0,
        explicacao: "O metal de sacrifício se oxida preferencialmente, protegendo a estrutura metálica."
    }
];

let indice = 0;
let pontos = 0;
let respondeu = false;

const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementById("opcoes");
const feedbackElemento = document.getElementById("feedback");
const proximoBotao = document.getElementById("proximo");

function carregarPergunta() {

    respondeu = false;

    const atual = perguntas[indice];

    perguntaElemento.textContent = atual.pergunta;
    opcoesElemento.innerHTML = "";
    feedbackElemento.textContent = "";

    proximoBotao.disabled = true;

    atual.opcoes.forEach((opcao, i) => {

        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.classList.add("opcao");

        botao.onclick = () => verificarResposta(i, botao);

        opcoesElemento.appendChild(botao);

    });
}

function verificarResposta(escolha, botaoEscolhido) {

    if (respondeu) return;

    respondeu = true;

    const atual = perguntas[indice];

    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach((botao, i) => {

        botao.disabled = true;

        if (i === atual.correta) {
            botao.classList.add("correta");
        }

    });

    if (escolha === atual.correta) {

        pontos++;

        feedbackElemento.textContent =
            "✓ Muito bem! " + atual.explicacao;

        feedbackElemento.style.color = "#71d6a2";

    } else {

        botaoEscolhido.classList.add("errada");

        feedbackElemento.textContent =
            "✗ Não foi dessa vez! " + atual.explicacao;

        feedbackElemento.style.color = "#f07868";

    }

    proximoBotao.disabled = false;

    if (indice === perguntas.length - 1) {
        proximoBotao.textContent = "VER RESULTADO";
    }
}

function proximaPergunta() {

    if (!respondeu) return;

    indice++;

    if (indice < perguntas.length) {

        carregarPergunta();

    } else {

        mostrarResultado();

    }
}

function mostrarResultado() {

    document.getElementById("pergunta-container").hidden = true;

    const resultado = document.getElementById("resultado-quiz");

    resultado.hidden = false;

    document.getElementById("pontuacao").textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas! ` +
        (pontos === 5
            ? "Excelente! Você é um verdadeiro especialista em eletroquímica!"
            : pontos >= 3
            ? "Muito bom! Você está dominando a investigação!"
            : "Continue estudando! Você pode tentar novamente.");
}

function reiniciarQuiz() {

    indice = 0;
    pontos = 0;
    respondeu = false;

    document.getElementById("resultado-quiz").hidden = true;
    document.getElementById("pergunta-container").hidden = false;

    proximoBotao.textContent = "PRÓXIMA PERGUNTA →";

    carregarPergunta();
}

carregarPergunta();
