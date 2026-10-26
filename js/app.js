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
        valorNecessario: 1000,
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

function atualizarTelaClick() {
    moeda.Musculo.elemento.innerHTML = Math.floor(moeda.Musculo.total)
}

function atualizarTelaUpgrade(idDoUpgrade) {

    let item = upgrades[idDoUpgrade];
        document.getElementById(`preco-${idDoUpgrade}`).textContent = item.custo;
        document.getElementById(`nivel-${idDoUpgrade}`).textContent = item.nivel;

    atualizarTelaClick();
} 

function atualizarTelaRebirth(){
    console.log("Rebirth Recebido")
}




// Funções para incremento de moeda

function incrementarMoeda(nivelIncremento = 10000000) {
    moeda.Musculo.total += nivelIncremento;
    estatisticas.moeda.MusculoGerado += nivelIncremento
    moeda.Rebirth.progressoValor += nivelIncremento
    atualizarTelaClick();
    atualizarProgressoRebirth();

    /*
    if (moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario){
        incrementarMoedaRebirth()
    }
    */
}


function incrementarMoedaRebirth(){
    if (moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario)
        moeda.Rebirth.total += 1
        moeda.Rebirth.valorNecessario = Math.round(moeda.Rebirth.valorNecessario * moeda.Rebirth.multiplicadorValorNecessario * 1000) / 1000
        moeda.Rebirth.progressoValor = 0
        atualizarTelaRebirth()

        barraprogresso.style.width = "0%";
}

setInterval(() => {
    moeda.Musculo.total += moeda.Musculo.porSegundo;
    estatisticas.moeda.MusculoGerado += moeda.Musculo.porSegundo;
    moeda.Rebirth.progressoValor += moeda.Musculo.porSegundo;

    /*
    if ((moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario)){
        incrementarMoedaRebirth()
    }
    */

    atualizarTelaClick();
    atualizarProgressoRebirth()
}, 1000);






// Funções para comprar upgrades

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
        
        // (Opcional) Aqui entraria também o código para apagar os níveis 
        // dos frangos e halteres e zerar os seus músculos
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