// Moedas
//Moeda principal
const moeda = {
    Musculo: {
        elemento: document.querySelector('.moeda-custo'),
        porClick: 1,
        porSegundo: 0,
        total: 0
    },

    Rebirth: {
        elemento: 0,
        total: 0,
        valorNecessario: 50000,
        multiplicadorValorNecessario: 1.5,
        progressoElemento: 0,
        progressoValor: 0
    },

    Triceps: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    },

    Peito: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    },

    Costas: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    },

    Pernas: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    },

    Ombros: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    }
}

// Funções para atualizar a tela

function formatarNumero(valor) {
    return valor.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

// Quanto cada upgrade comprado está rendendo por segundo (já com os bônus de grupos e rebirth)
// Obs.: usa nivel * moedasPorSegundo, o que é exato enquanto multiplicadorMoedasPorSegundo = 1
function atualizarRendimentos() {
    const bonus = multiplicadorSegundo() * multiplicadorRebirthSegundo();

    for (const id of upgradesLateral) {
        const elemento = document.getElementById(`rendimento-${id}`);
        if (elemento) {
            elemento.textContent = formatarNumero(upgrades[id].nivel * upgrades[id].moedasPorSegundo * bonus);
        }
    }
}

function atualizarTelaClick() {
    moeda.Musculo.elemento.innerHTML = Math.floor(moeda.Musculo.total)

    // valor atual de cada clique, com o bônus dos grupos musculares
    document.getElementById("valor-click").textContent = formatarNumero(moeda.Musculo.porClick * multiplicadorClick());
    atualizarRendimentos();
}

function atualizarTelaUpgrade(idDoUpgrade) {

    let item = upgrades[idDoUpgrade];
        document.getElementById(`preco-${idDoUpgrade}`).textContent = item.custo;
        document.getElementById(`nivel-${idDoUpgrade}`).textContent = item.nivel;

    atualizarTelaClick();
}

function atualizarTelaRebirth(){
    document.querySelector('.moeda-rebirth').textContent = moeda.Rebirth.total;
}




// Funções para incremento de moeda

function incrementarMoeda(nivelIncremento = moeda.Musculo.porClick) { // porClick dobra a cada rebirth
    nivelIncremento *= multiplicadorClick(); // bônus dos grupos musculares
    moeda.Musculo.total += nivelIncremento;
    estatisticas.moeda.MusculoGerado += nivelIncremento
    moeda.Rebirth.progressoValor += nivelIncremento
    ganharXpGrupo(nivelIncremento);
    atualizarTelaClick();
    atualizarProgressoRebirth();

    /*
    if (moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario){
        incrementarMoedaRebirth()
    }
    */
}


function incrementarMoedaRebirth(){
    if (moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario) {
        moeda.Rebirth.total += 1
        moeda.Rebirth.valorNecessario = Math.round(moeda.Rebirth.valorNecessario * moeda.Rebirth.multiplicadorValorNecessario * 1000) / 1000
        moeda.Rebirth.progressoValor = 0
        atualizarTelaRebirth()

        barraprogresso.style.width = "0%";
    }
}

// Bônus do rebirth
const BONUS_REBIRTH_PRODUCAO = 0.02; // +2% de produção dos upgrades por rebirth
const BONUS_REBIRTH_CLICK = 1;       // +100% do valor atual do clique por rebirth (dobra)

function multiplicadorRebirthSegundo() {
    return 1 + moeda.Rebirth.total * BONUS_REBIRTH_PRODUCAO;
}

// Reinicia a run: zera músculo e upgrades, mantém rebirths, porClick e grupos musculares
function resetarRun() {
    moeda.Musculo.total = 0;
    moeda.Musculo.porSegundo = 0;
    moeda.Musculo.porClick += moeda.Musculo.porClick * BONUS_REBIRTH_CLICK;

    for (const id in upgrades) {
        Object.assign(upgrades[id], upgradesIniciais[id]); // volta custo, nível e produção originais
    }
    upgradesComprados.length = 0;

    // salva o estado novo e recarrega: o carregarJogo() reconstrói a loja do zero
    salvarJogo();
    location.reload();
}

setInterval(() => {
    // bônus dos grupos musculares e dos rebirths
    const ganhoPorSegundo = moeda.Musculo.porSegundo * multiplicadorSegundo() * multiplicadorRebirthSegundo();
    moeda.Musculo.total += ganhoPorSegundo;
    estatisticas.moeda.MusculoGerado += ganhoPorSegundo;
    moeda.Rebirth.progressoValor += ganhoPorSegundo;
    ganharXpGrupo(ganhoPorSegundo);

    /*
    if ((moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario)){
        incrementarMoedaRebirth()
    }
    */

    atualizarTelaClick();
    atualizarProgressoRebirth()
}, 1000);






// Funções para comprar upgrades

const efeito_compra = new Audio("./sound/compra_upgrade.mp3")

efeito_compra.volume = 0.3;

function comprarUpgrade(idDoUpgrade, valorSelecionado = 1) {
    let item = upgrades[idDoUpgrade];

    if (moeda.Musculo.total >= item.custo) { // Arrumar com X numeros de upgrades comprados
        moeda.Musculo.total -= item.custo;

        item.nivel += valorSelecionado; // Arrumar com X numeros de upgrades comprados
        item.custo = Math.floor(item.custo * item.multiplicadorCusto);

        moeda.Musculo.porSegundo += item.moedasPorSegundo; // Arrumar com X numeros de upgrades comprados
        moeda.Musculo.porSegundo = Math.round(moeda.Musculo.porSegundo * 1000) / 1000;
        item.moedasPorSegundo = Math.round(item.moedasPorSegundo * item.multiplicadorMoedasPorSegundo * 1000) / 1000;
        console.log("Esse é a moeda por segundo do upgrade:" + item.moedasPorSegundo)

        efeito_compra.play()

        atualizarTelaUpgrade(idDoUpgrade);

        if (!upgradesComprados.includes(idDoUpgrade)) {
            mostrarNovoUpgrade();
            adicionarUpgradeComprado(idDoUpgrade);
        }
    }


}

function adicionarUpgradeComprado(idDoUpgrade) {
    upgradesComprados.push(idDoUpgrade);

    // Adiciona a imagem do upgrade assim que ele é comprado
    let elementoImg = document.getElementById(`${idDoUpgrade}-img`);

    const DURACAO_ANIM = 2000; //ms, deve ser igual o valor no style.css

    elementoImg.src = upgrades[idDoUpgrade].img;
    elementoImg.style.animationDelay = `-${(document.timeline.currentTime % DURACAO_ANIM) / 1000}s`;
    elementoImg.classList.add("comprado");
}

const botaoRebirth = document.getElementById("botao-rebirth");
const barraprogresso = document.getElementById("preenchimento-rebirth")

function clicarNoRebirth() {
    // Só deixa dar rebirth se a barra estiver no talo
    if (moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario) {
        incrementarMoedaRebirth();

        barraprogresso.style.width = "0%";
        botaoRebirth.classList.remove("pronto");

        resetarRun();
    } else {
        console.log("Você ainda precisa treinar mais para o Rebirth!");
    }
}


// Progresso Rebirth



function atualizarProgressoRebirth() {
    // Calcula a percentagem
    moeda.Rebirth.progressoElemento = (moeda.Rebirth.progressoValor * 100) / moeda.Rebirth.valorNecessario;

    if (moeda.Rebirth.progressoElemento < 100) {
        // Enquanto não chega ao fim, atualiza o tamanho e garante que não há brilho
        barraprogresso.style.width = moeda.Rebirth.progressoElemento + "%";
        botaoRebirth.classList.remove("pronto");
    } else {
        // Chegou ao fim! Trava em 100% e liga o brilho
        barraprogresso.style.width = "100%";
        botaoRebirth.classList.add("pronto");
    }
}
