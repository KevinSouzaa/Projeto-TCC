const upgrades = {
    frango: {
        nome: "Frango",
        custo: 15,
        nivel: 0,

        multiplicadorCusto: 1.15,
        moedasPorSegundo: 0.2,
        multiplicadorMoedasPorSegundo: 1,

        locking: "sprites/upgrades/frango_lock.png",
        img: "sprites/upgrades/frango_1.png"
    },

    ovo: {
        nome: "Ovo",
        custo: 100,
        nivel: 0,

        multiplicadorCusto: 1.15,
        moedasPorSegundo: 1,
        multiplicadorMoedasPorSegundo: 1,

        locking: "sprites/upgrades/ovo_bloqueado.png",
        img: "sprites/upgrades/ovo.png",
    },

    halterInfantil: {
        nome: "Halter Infantil",
        custo: 1100,
        nivel: 0,

        multiplicadorCusto: 1.15,
        moedasPorSegundo: 8,
        multiplicadorMoedasPorSegundo: 1,

        locking: "sprites/upgrades/HALTER_INFANTIL_lock.png",
        img: "sprites/upgrades/HALTER_INFANTIL_1.png"
    },

    garrafaAgua: {
        nome: "Garrafa de Água",
        custo: 12000,
        nivel: 0,

        multiplicadorCusto: 1.15,
        moedasPorSegundo: 47,
        multiplicadorMoedasPorSegundo: 1,

        locking: "sprites/upgrades/GARRAFA_AGUA_lock.png",
        img: "sprites/upgrades/garrafa_agua_1.png"
    },

    personalAcademia: {
        nome: "Personal Academia",
        custo: 130000,
        nivel: 0,

        multiplicadorCusto: 1.15,
        moedasPorSegundo: 260,
        multiplicadorMoedasPorSegundo: 1,

        locking: "sprites/upgrades/Personam_academia_lock.png",
        img: "sprites/upgrades/Personam_academia_1.png"
    },

    BarraV: {
        nome: "Barra V",
        custo: 1400000,
        nivel: 0,

        multiplicadorCusto: 1.15,
        moedasPorSegundo: 1400,
        multiplicadorMoedasPorSegundo: 1,

        moedaTricepsPorSegundo: 1,

        locking: "sprites/upgrades/Barra_V_lock.png",
        img: "sprites/upgrades/Barra_V_1.png"
    }
};

// Cópia dos valores iniciais, usada para resetar os upgrades no rebirth
const upgradesIniciais = JSON.parse(JSON.stringify(upgrades));

const upgradesLateral = ["frango"];

function mostrarNovoUpgrade() {
    lojaUpgrades = "";
    for (const upgrade in upgrades){
        if (!upgradesLateral.includes(upgrade)) {
            lojaUpgrades += `
                <div class="upgrade" onclick="comprarUpgrade('${upgrade}')">
                    <div class="upgrade-icon">
                        <img src="${upgrades[upgrade].locking}" alt="" id="${upgrade}-img" class="upgrade-img">
                    </div>

                    <div class="upgrade-info">
                        <h4>${upgrades[upgrade].nome}</h4>

                        <div class="preco-info">
                            <p>Preço: <span id="preco-${upgrade}">${upgrades[upgrade].custo}</span> </p>
                            <img src="sprites/moedas/braco.png" alt="" class="braco-img">
                        </div>
                        <p class="upgrade-rendimento">Rende: <span id="rendimento-${upgrade}">0</span>/s</p>
                    </div>

                    <div class="upgrade-level">
                        <span id="nivel-${upgrade}">${upgrades[upgrade].nivel}</span>
                    </div>
                </div>
        
        `
        upgradesLateral.push(upgrade);
        break;
        }
        
    }
    document.getElementById("lojaUpgrades").insertAdjacentHTML("beforeend", lojaUpgrades) // Adiciona os novos elementos no final do html, e não faz toda a sobrescrição.
}

