// Moedas
let moeda_musculo = document.querySelector('.moeda-custo');
let moedas = 0;

// Botões de abrir e fechar as configurações
const btn_AbrirConfig = document.getElementById("btn-direita")
const btn_fecharConfig = document.getElementById("btn-fechar-config");

// Menu e overlay de configurações
const boxconfig = document.getElementById("configuracoes")
const overlayConfig = document.getElementById('overlay-configuracoes');

// Imagem principal do Personagem
const personagemImg = document.querySelector('.boneco-image');
const imgNormal = `${image_path.personagem}Fraco_1.png`;

// Imagem do personagem após clicar na tela
const imgClicado = `${image_path.personagem}Fraco_2.png`;

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

function incrementarMoeda() {
    moedas += 1;
    atualizarTela();
}


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
    moeda_musculo.innerHTML = moedas;
    
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
    


