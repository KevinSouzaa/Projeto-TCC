// Moedas
let gem = document.querySelector('.gem-cost')
let moedas = 0;

// Botões de abrir e fechar as configurações
const btn_AbrirConfig = document.getElementById("bot-direita")
const btn_fecharConfig = document.getElementById("fechar-config");

// Menu e overlay de configurações
const boxconfig = document.getElementById("configuracoes")
const overlayConfig = document.getElementById('overlay-configuracoes');

// Imagem principal do Personagem
const personagemImg = document.querySelector('.boneco-image');
const imgNormal = './foto/Personagem Fraco-1.png';

// Imagem do personagem após clicar na tela
const imgClicado = "./foto/Personagem Fraco-2.png";

let tempoAnimacao;


// Troca as imagens do personagem ao clicar
personagemImg.addEventListener("click", function(){
    personagemImg.src = imgClicado;

    // 2. Reseta o tempo caso o jogador clique muito rápido / Não entendi a utilidade??
    //clearTimeout(tempoAnimacao);

    tempoAnimacao = setTimeout(() => {
        personagemImg.src = imgNormal;
    }, 180);
})

function incrementGem() {
    moedas += 1;
    atualizarTela();
}

const upgrades = {
    frango: {
        custo: 10,
        nivel: 0,
        multiplicador: 1.5, // O preço aumenta 50% a cada compra
        elementoPreco: document.getElementById('preco-frango'),
        elementoNivel: document.getElementById('nivel-frango')
    },

    suplemento: {
        custo: 20,
        nivel: 0,
        multiplicador: 1.8, // O preço aumenta 50% a cada compra
        elementoPreco: document.getElementById('preco-suplemento'),
        elementoNivel: document.getElementById('nivel-suplemento')
    }
};


function comprarUpgrade(idDoUpgrade) {
    let item = upgrades[idDoUpgrade];

    if (moedas >= item.custo) {
        moedas -= item.custo;
        item.nivel += 1;

        item.custo = Math.floor(item.custo * item.multiplicador);
    }

    atualizarTela();
}

function atualizarTela() {
    gem.innerHTML = moedas;
    
    for (let id in upgrades) {
        let item = upgrades[id];
        item.elementoPreco.innerHTML = item.custo;
        item.elementoNivel.innerHTML = item.nivel;
    }
}

function abrirMenu(){
    boxconfig.classList.add("mostrar");
    overlayConfig.classList.add("mostrar")
    
}
    

function fecharMenu(){
    boxconfig.classList.remove("mostrar");
    overlayConfig.classList.remove("mostrar")
}

btn_AbrirConfig.addEventListener("click", abrirMenu);
btn_fecharConfig.addEventListener("click", fecharMenu);
    


