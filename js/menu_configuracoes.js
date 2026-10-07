// Botões de abrir e fechar as configurações
const btn_AbrirConfig = document.getElementById("btn-direita")
const btn_fecharConfig = document.getElementById("btn-fechar-config");

// Menu e overlay de configurações
const boxconfig = document.getElementById("configuracoes")
const overlayConfig = document.getElementById('overlay-configuracoes');


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


//Estatisitcas

const upgradesComprados = []


const estatisticas ={
    moeda:{
        moedasMusculoGerados: 0
    }
}



