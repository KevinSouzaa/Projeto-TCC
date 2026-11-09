// Grupos musculares (seção "Categoria e Nível")
// Cada grupo tem uma barra de nível. Você escolhe qual grupo está treinando (clicando no card)
// e uma parte de todo o Músculo gerado vira XP para ele. Ao encher a barra, o grupo sobe de nível
// e dá bônus de produção.
// Precisa ser carregado ANTES do app.js (o app.js usa multiplicadorClick/multiplicadorSegundo/ganharXpGrupo)
// e antes do save.js.

const PORCENTAGEM_XP = 0.10; // 10% do músculo gerado vira XP do grupo treinado

const gruposMusculares = {
    peito: {
        nome: "Peito",
        nivel: 0,
        xp: 0,
        xpBase: 100,
        multiplicadorXp: 1.8,
        bonusClick: 0.10,    // +10% no clique por nível
        bonusSegundo: 0
    },

    costas: {
        nome: "Costas",
        nivel: 0,
        xp: 0,
        xpBase: 100,
        multiplicadorXp: 1.8,
        bonusClick: 0,
        bonusSegundo: 0.10   // +10% por segundo por nível
    },

    pernas: {
        nome: "Pernas",
        nivel: 0,
        xp: 0,
        xpBase: 100,
        multiplicadorXp: 1.8,
        bonusClick: 0.05,
        bonusSegundo: 0.05
    },

    bracos: {
        nome: "Braços",
        nivel: 0,
        xp: 0,
        xpBase: 100,
        multiplicadorXp: 1.8,
        bonusClick: 0.05,
        bonusSegundo: 0.05
    }
};

let grupoAtivo = "peito"; // grupo que está recebendo XP


function xpNecessario(id) {
    const grupo = gruposMusculares[id];
    return Math.floor(grupo.xpBase * Math.pow(grupo.multiplicadorXp, grupo.nivel));
}

// Multiplicadores somados de todos os grupos (1 = sem bônus)
function multiplicadorClick() {
    let mult = 1;
    for (const id in gruposMusculares) {
        mult += gruposMusculares[id].nivel * gruposMusculares[id].bonusClick;
    }
    return mult;
}

function multiplicadorSegundo() {
    let mult = 1;
    for (const id in gruposMusculares) {
        mult += gruposMusculares[id].nivel * gruposMusculares[id].bonusSegundo;
    }
    return mult;
}

// Chamada pelo app.js toda vez que o jogador gera músculo
function ganharXpGrupo(musculoGerado) {
    const grupo = gruposMusculares[grupoAtivo];
    grupo.xp += musculoGerado * PORCENTAGEM_XP;

    // while, pois com muito ganho pode subir mais de um nível de uma vez
    while (grupo.xp >= xpNecessario(grupoAtivo)) {
        grupo.xp -= xpNecessario(grupoAtivo);
        grupo.nivel += 1;
    }

    atualizarTelaGrupo(grupoAtivo);
}

function textoBonusGrupo(grupo) {
    const partes = [];
    if (grupo.bonusClick > 0) partes.push(`+${Math.round(grupo.bonusClick * 100)}% clique`);
    if (grupo.bonusSegundo > 0) partes.push(`+${Math.round(grupo.bonusSegundo * 100)}% por segundo`);
    return partes.join(" / ") + " por nível";
}

function criarCardsGrupos() {
    let html = "";
    for (const id in gruposMusculares) {
        const grupo = gruposMusculares[id];
        html += `
            <div class="grupo" id="grupo-${id}" onclick="escolherGrupo('${id}')">
                <div class="grupo-topo">
                    <h4>${grupo.nome}</h4>
                    <span class="grupo-nivel">Nv. <span id="nivel-grupo-${id}">${grupo.nivel}</span></span>
                </div>
                <div class="grupo-barra">
                    <div class="grupo-barra-preenchimento" id="barra-grupo-${id}"></div>
                    <span class="grupo-barra-texto" id="texto-grupo-${id}"></span>
                </div>
                <p class="grupo-bonus">${textoBonusGrupo(grupo)}</p>
            </div>
        `;
    }
    document.getElementById("categoria").innerHTML = html;

    for (const id in gruposMusculares) {
        atualizarTelaGrupo(id);
    }
    marcarGrupoAtivo();
}

function atualizarTelaGrupo(id) {
    const grupo = gruposMusculares[id];
    const necessario = xpNecessario(id);
    const porcentagem = Math.min(100, (grupo.xp * 100) / necessario);

    document.getElementById(`nivel-grupo-${id}`).textContent = grupo.nivel;
    document.getElementById(`barra-grupo-${id}`).style.width = porcentagem + "%";
    document.getElementById(`texto-grupo-${id}`).textContent = `${Math.floor(grupo.xp)} / ${necessario}`;
}

function marcarGrupoAtivo() {
    for (const id in gruposMusculares) {
        document.getElementById(`grupo-${id}`).classList.toggle("ativo", id === grupoAtivo);
    }
}

function escolherGrupo(id) {
    grupoAtivo = id;
    marcarGrupoAtivo();
}

criarCardsGrupos();
