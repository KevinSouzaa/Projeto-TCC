// Moedas
//Moeda principal
const moeda = {
    moedaMusculo: {
        elemento: document.querySelector('.moeda-custo'),
        porClick: 1,
        porSegundo: 0,
        total: 0
    },
    
    moedaTriceps: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    },
    
    moedaPeito: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    },

    moedaCostas: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    },

    moedaPernas: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    },

    moedaOmbros: {
        elemento: 0,
        porSegundo: 0,
        total: 0
    }
}

// Funções para atualizar a tela

function atualizarTelaClick() {
    moeda.moedaMusculo.elemento.innerHTML = Math.floor(moeda.moedaMusculo.total)
}

function atualizarTelaUpgrade(idDoUpgrade) {

    let item = upgrades[idDoUpgrade];
        document.getElementById(`preco-${idDoUpgrade}`).textContent = item.custo;
        document.getElementById(`nivel-${idDoUpgrade}`).textContent = item.nivel;

    atualizarTelaClick();
} 


// Funções para incremento de moeda

function incrementarMoeda(nivelIncremetno = 1000000) {
    moeda.moedaMusculo.total += nivelIncremetno;
    atualizarTelaClick();
}


setInterval(() => {
    moeda.moedaMusculo.total += moeda.moedaMusculo.porSegundo;
    atualizarTelaClick();
}, 1000);


// Funções para comprar upgrades

function comprarUpgrade(idDoUpgrade, valorSelecionado = 1) {
    let item = upgrades[idDoUpgrade];

    if (moeda.moedaMusculo.total >= item.custo) { // Arrumar com X numeros de upgrades comprados
        moeda.moedaMusculo.total -= item.custo;

        item.nivel += valorSelecionado; // Arrumar com X numeros de upgrades comprados
        item.custo = Math.floor(item.custo * item.multiplicadorCusto);
        
        moeda.moedaMusculo.porSegundo += item.moedasPorSegundo; // Arrumar com X numeros de upgrades comprados
        moeda.moedaMusculo.porSegundo = Math.round(moeda.moedaMusculo.porSegundo * 1000) / 1000; 
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

    framesUpgradeComprados.push({
        elemento: document.getElementById(`${idDoUpgrade}-img`),
        frames: [upgrades[idDoUpgrade].img1, upgrades[idDoUpgrade].img2],
        }
    );
}

setInterval(() => {
    console.log(moeda.moedaMusculo.porSegundo)
}, 1000);