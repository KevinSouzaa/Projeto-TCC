//Estatisitcas

const upgradesComprados = []


const estatisticas ={
    moeda:{
        MusculoGerado: 0
    }
}


const btn_AbrirEstatisticas = document.getElementById("btn-esquerdo");
const btn_FecharEstatisticas = document.getElementById("btn-fechar-estatisticas");


const boxEstatisticas = document.getElementById("estatisticas");
const overlayEstatisticas = document.getElementById("overlay-estatisticas");


const totalMusculoGerado = document.getElementById("total-musculo-gerado");

function abrirEstatisticas() {
    boxEstatisticas.classList.add("mostrar");
    overlayEstatisticas.classList.add("mostrar");

    atualizarEstatisticas();
}

function fecharEstatisticas() {
    boxEstatisticas.classList.remove("mostrar");
    overlayEstatisticas.classList.remove("mostrar");
}

function atualizarEstatisticas() {
    totalMusculoGerado.textContent = estatisticas.moeda.MusculoGerado.toFixed(3);
}

btn_AbrirEstatisticas.addEventListener("click", abrirEstatisticas);
btn_FecharEstatisticas.addEventListener("click", fecharEstatisticas);

