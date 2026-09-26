let gem = document.querySelector('.gem-cost')

const personagemImg = document.querySelector('.boneco-image');

const imgNormal = './foto/Personagem Fraco-1.png';
const imgClicado = "./foto/Personagem Fraco-2.png";

let tempoAnimacao;

// Troca as imagens do personagem ao clicar
personagemImg.addEventListener("click", function(){
    personagemImg.src = imgClicado;

    // 2. Reseta o tempo caso o jogador clique muito rápido
    //clearTimeout(tempoAnimacao);

    tempoAnimacao = setTimeout(() => {
        personagemImg.src = imgNormal;
    }, 150);
})

let clickerCost = document.querySelector('.clicker-preco')
let parseClickerCost = parseFloat(clickerCost.innerHTML)

const btn_AbrirConfig = document.getElementById("bot-direita")
const btn_fecharConfig = document.getElementById("fechar-config");

const boxconfig = document.getElementById("configuracoes")
const overlayConfig = document.getElementById('overlay-configuracoes');



function incrementGem() {
    gem.innerHTML = parseFloat(gem.innerHTML) + 1
}

function comprarFrango() {
    if (parseFloat(gem.innerHTML) >= parseFloat(clickerCost.innerHTML)) {
        gem.innerHTML -= clickerCost.innerHTML
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
    


