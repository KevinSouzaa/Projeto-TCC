// Moedas
let moedaMusculo = document.querySelector('.moeda-custo');
let moedasMusculoPorSegundo = 0;
let moedaMusculoTotal = 0;



// Funções para atualizar a tela

function atualizarTelaClick() {
    moedaMusculo.innerHTML = moedaMusculoTotal;
}

function atualizarTelaUpgrade(idDoUpgrade) {

    let item = upgrades[idDoUpgrade];
        document.getElementById(`preco-${idDoUpgrade}`).textContent = item.custo;
        document.getElementById(`nivel-${idDoUpgrade}`).textContent = item.nivel;

    atualizarTelaClick();
} 


// Funções para incremento de moeda

function incrementarMoeda(nivelIncremetno = 1000000) {
    moedaMusculoTotal += nivelIncremetno;
    atualizarTelaClick();
}


setInterval(() => {
    moedaMusculoTotal += moedasMusculoPorSegundo;
    atualizarTelaClick();
}, 1000);


// Funções para comprar upgrades

function comprarUpgrade(idDoUpgrade, valorSelecionado = 1) {
    let item = upgrades[idDoUpgrade];

    if (moedaMusculoTotal >= item.custo) { // Arrumar com X numeros de upgrades comprados
        moedaMusculoTotal -= item.custo;
        item.nivel += valorSelecionado; // Arrumar com X numeros de upgrades comprados
        item.custo = Math.floor(item.custo * item.multiplicadorCusto);
        item.moedasPorSegundo = Math.floor(item.moedasPorSegundo * item.multiplicadorMoedasPorSegundo);
        moedasMusculoPorSegundo += Math.floor(item.moedasPorSegundo); // Arrumar com X numeros de upgrades comprados 
        
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

