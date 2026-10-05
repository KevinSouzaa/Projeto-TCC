const upgrades = {
    frango: {
        custo: 10,
        nivel: 0,

        multiplicadorCusto: 1.5,
        moedasPorSegundo: 1,
        multiplicadorMoedasPorSegundo: 1.1,

        locking: "sprites/upgrades/frango_lock.png",
        img1: "sprites/upgrades/frango_1.png",
        img2: "sprites/upgrades/frango_2.png"
    },

    ovo: {
        custo: 100,
        nivel: 0,

        multiplicadorCusto: 1.8,
        moedasPorSegundo: 10,
        multiplicadorMoedasPorSegundo: 1.1,

        locking: "sprites/upgrades/Ovo_lock.png",
        img1: "sprites/upgrades/Ovo_1.png",
        img2: "sprites/upgrades/Ovo_2.png"
    }
};


upgradesNaLoja = ["frango"]
console.log(upgradesNaLoja)

function mostrarNovoUpgrade() {
    lojaUpgrades = "";
    for (const upgrade in upgrades){
        if (!upgradesNaLoja.includes(upgrade)) {
            lojaUpgrades += `
                <div class="upgrade" onclick="comprarUpgrade('${upgrade}')">
                    <div class="left-section">
                        <img src="${upgrades[upgrade].img1}" alt="" class="upgrade-img">
                    </div>

                    <div class="mid-section">
                        <h4>${upgrade}</h4>

                        <div class="preco-info">
                            <p>Preço: <span id="preco-${upgrade}">10</span> </p>
                            <img src="sprites/moedas/braco.png" alt="" class="braco-img">
                        </div>
                    </div>

                    <div class="right-section">
                        <span id="nivel-${upgrade}">0</span>
                    </div>
                </div>
        
        `}
    
        upgradesNaLoja.push(upgrade);
    }
    document.getElementById("lojaUpgrades").innerHTML += lojaUpgrades;
}

