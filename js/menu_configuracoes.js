// Botões de abrir e fechar as configurações
const btn_AbrirConfig = document.getElementById("btn-direita")
const btn_fecharConfig = document.getElementById("btn-fechar-config");

const efeito_abrir = new Audio("./sound/abrir_config.wav")

efeito_abrir.volume = 0.3;

const efeito_fechar = new Audio("./sound/fechar_config.wav")

efeito_fechar.volume = 0.3;

// Menu e overlay de configurações
const boxconfig = document.getElementById("configuracoes")
const overlayConfig = document.getElementById('overlay-configuracoes');


function abrirMenu(){
    boxconfig.classList.add("mostrar");
    overlayConfig.classList.add("mostrar")

    efeito_abrir.play()
    
}
    

function fecharMenu(){
    boxconfig.classList.remove("mostrar");
    overlayConfig.classList.remove("mostrar")

    efeito_fechar.play()
}

btn_AbrirConfig.addEventListener("click", abrirMenu);
btn_fecharConfig.addEventListener("click", fecharMenu);


//Estatisitcas

const upgradesComprados = []


const estatisticas ={
    moeda:{
        MusculoGerado: 0
    }
}



