const upgrades = {
    frango: {
        nome: "Frango",
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
        nome: "Ovo",
        custo: 100,
        nivel: 0,

        multiplicadorCusto: 1.8,
        moedasPorSegundo: 10,
        multiplicadorMoedasPorSegundo: 1.1,

        locking: "sprites/upgrades/Ovo_lock.png",
        img1: "sprites/upgrades/Ovo_1.png",
        img2: "sprites/upgrades/Ovo_2.png"
    },

    halterInfantil: {
        nome: "Halter Infantil",
        custo: 1000,
        nivel: 0,

        multiplicadorCusto: 2,
        moedasPorSegundo: 20,
        multiplicadorMoedasPorSegundo: 1.1,

        locking: "sprites/upgrades/HALTER_INFANTIL_lock.png",
        img1: "sprites/upgrades/HALTER_INFANTIL_1.png",
        img2: "sprites/upgrades/HALTER_INFANTIL_2.png"
    },

    garrafaAgua: {
        nome: "Garrafa de Água",
        custo: 10000,
        nivel: 0,

        multiplicadorCusto: 2.5,
        moedasPorSegundo: 100,
        multiplicadorMoedasPorSegundo: 1.1,

        locking: "sprites/upgrades/GARRAFA_DE_AGUA_lock.png",
        img1: "sprites/upgrades/garrafa_agua_1.png",
        img2: "sprites/upgrades/garrafa_agua_2.png"
    },

    personalAcademia: {
        nome: "Personal Academia",
        custo: 50000,
        nivel: 0,

        multiplicadorCusto: 3,
        moedasPorSegundo: 150,
        multiplicadorMoedasPorSegundo: 1.1,

        locking: "sprites/upgrades/Personam_academia_lock.png",
        img1: "sprites/upgrades/Personam_academia_1.png",
        img2: "sprites/upgrades/Personam_academia_2.png"
    },

    BarraV: {
        nome: "Barra V",
        custo: 100000,
        nivel: 0,

        multiplicadorCusto: 3.5,
        moedasPorSegundo: 500,
        multiplicadorMoedasPorSegundo: 1.1,

        moedaTriceps: 1,

        locking: "sprites/upgrades/Barra_V_lock.png",
        img1: "sprites/upgrades/Barra_V_1.png",
        img2: "sprites/upgrades/Barra_V_2.png"
    }
};


upgradesNaLoja = ["Frango"]
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
                        <h4>${upgrades[upgrade].nome}</h4>

                        <div class="preco-info">
                            <p>Preço: <span id="preco-${upgrade}">10</span> </p>
                            <img src="sprites/moedas/braco.png" alt="" class="braco-img">
                        </div>
                    </div>

                    <div class="right-section">
                        <span id="nivel-${upgrade}">0</span>
                    </div>
                </div>
        
        `
        upgradesNaLoja.push(upgrade);
        break;
        }
        
    }
    document.getElementById("lojaUpgrades").innerHTML += lojaUpgrades;
}

