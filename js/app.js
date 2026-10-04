// Moedas
let moedaMusculo = document.querySelector('.moeda-custo');
let moedasMusculoPorSegundo = 0;
let moedaMusculoTotal = 0;



// Funções para atualizar a tela

function atualizarTelaClick() {
    moedaMusculo.innerHTML = moedaMusculoTotal;
}

function atualizarTelaUpgrade() {
    
    atualizarTelaClick();

    for (let id in upgrades) {
        let item = upgrades[id];
        item.elementoPreco.innerHTML = item.custo;
        item.elementoNivel.innerHTML = item.nivel;
    }
} 


// Funções para incremento de moeda

function incrementarMoeda(nivelIncremetno = 1) {
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
    }

    atualizarTelaUpgrade();
}



