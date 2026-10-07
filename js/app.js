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

function incrementarMoeda(nivelIncremento = 10) {
    moeda.Musculo.total += nivelIncremento;
    estatisticas.moeda.MusculoGerado += nivelIncremento
    moeda.Rebirth.progressoValor += nivelIncremento
    atualizarTelaClick();

    if (moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario){
        incrementarMoedaRebirth()
    }
}


function incrementarMoedaRebirth(){
    if (moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario)
        moeda.Rebirth.total += 1
        moeda.Rebirth.valorNecessario = Math.round(moeda.Rebirth.valorNecessario * moeda.Rebirth.multiplicadorValorNecessario * 1000) / 1000
        moeda.Rebirth.progressoValor = 0
        atualizarTelaRebirth()
}

setInterval(() => {
    moeda.Musculo.total += moeda.Musculo.porSegundo;
    estatisticas.moeda.MusculoGerado += moeda.Musculo.porSegundo;
    moeda.Rebirth.progressoValor += moeda.Musculo.porSegundo;

    if ((moeda.Rebirth.progressoValor >= moeda.Rebirth.valorNecessario)){
        incrementarMoedaRebirth()
    }

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

    framesUpgradeComprados.push({
        elemento: document.getElementById(`${idDoUpgrade}-img`),
        frames: [upgrades[idDoUpgrade].img1, upgrades[idDoUpgrade].img2],
        }
    );
}


// Progresso Rebirth

function atualizarProgressoRebirth(){
    moeda.Rebirth.progressoElemento = ((moeda.Rebirth.valorNecessario - (moeda.Rebirth.valorNecessario - moeda.Rebirth.progressoValor)) * 100) / moeda.Rebirth.valorNecessario;;
    if (moeda.Rebirth.progressoElemento <= 100){
        
    }
    else{
        console.log("Progresso:100%")
    }
}