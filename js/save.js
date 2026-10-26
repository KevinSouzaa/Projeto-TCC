// Sistema de Save/Load
// Precisa ser carregado DEPOIS do app.js

const CHAVE_SAVE = "bodyClicker_save"; // nome do save no navegador
const TEMPO_AUTOSAVE = 60 * 1000; // salva a cada 60s

let saveExcluido = false; // impede que o jogo salve de novo depois de excluir o save

function salvarJogo() {
    if (saveExcluido) return;

    // só salvamos o que muda durante o jogo (imagens, nomes e multiplicadores ficam no código)
    const save = {
        horaDoSave: Date.now(),

        musculo: {
            total: moeda.Musculo.total,
            porClick: moeda.Musculo.porClick,
            porSegundo: moeda.Musculo.porSegundo
        },

        rebirth: {
            total: moeda.Rebirth.total,
            valorNecessario: moeda.Rebirth.valorNecessario,
            progressoValor: moeda.Rebirth.progressoValor
        },

        upgrades: {},
        upgradesComprados: upgradesComprados,
        musculoGerado: estatisticas.moeda.MusculoGerado
    };

    for (const id in upgrades) {
        save.upgrades[id] = {
            custo: upgrades[id].custo,
            nivel: upgrades[id].nivel,
            moedasPorSegundo: upgrades[id].moedasPorSegundo
        };
    }

    // o localStorage só guarda texto, então transformamos o objeto em texto (JSON)
    localStorage.setItem(CHAVE_SAVE, JSON.stringify(save));
}


function carregarJogo() {
    const texto = localStorage.getItem(CHAVE_SAVE);
    
    if (texto == null) return; // não existe save, começa do zero

    let save;
    try {
        save = JSON.parse(texto); // transforma o texto de volta em objeto
    } catch (erro) {
        console.log("Save corrompido.");
        return;
    }

    // moedas
    moeda.Musculo.total = save.musculo.total;
    moeda.Musculo.porClick = save.musculo.porClick;
    moeda.Musculo.porSegundo = save.musculo.porSegundo;

    moeda.Rebirth.total = save.rebirth.total;
    moeda.Rebirth.valorNecessario = save.rebirth.valorNecessario;
    moeda.Rebirth.progressoValor = save.rebirth.progressoValor;

    estatisticas.moeda.MusculoGerado = save.musculoGerado;

    // upgrades
    for (const id in save.upgrades) {
        if (upgrades[id]) {
            upgrades[id].custo = save.upgrades[id].custo;
            upgrades[id].nivel = save.upgrades[id].nivel;
            upgrades[id].moedasPorSegundo = save.upgrades[id].moedasPorSegundo;
        }
    }

    for (const id of save.upgradesComprados) {
        if (upgrades[id]) {
            mostrarNovoUpgrade();
            adicionarUpgradeComprado(id);
        }
    }

    // atualiza a tela com os valores carregados
    for (const id of upgradesLateral) {
        atualizarTelaUpgrade(id);
    }

    atualizarTelaClick();
    atualizarProgressoRebirth();
}


function excluirSave() {
    if (!confirm("Tem certeza? Todo o progresso será perdido.")) {
        return;
    }

    saveExcluido = true;
    localStorage.removeItem(CHAVE_SAVE);
    location.reload(); // recarrega a página para começar do zero
}


function exportarSave() {
    salvarJogo(); // garante que o save está atualizado

    const texto = localStorage.getItem(CHAVE_SAVE);

    // btoa transforma o texto em base64
    caixaCodigoSave.value = btoa(texto);
    caixaCodigoSave.select();
}


function importarSave() {
    const codigo = caixaCodigoSave.value.trim();
    if (codigo == "") return;

    let save;
    try {
        save = JSON.parse(atob(codigo)); // faz a decodificação de base64 para texto
    } catch (erro) {
        alert("Código de save inválido.");
        return;
    }

    if (save.musculo == null) { // não é um save do nosso jogo
        alert("Código de save inválido.");
        return;
    }

    if (!confirm("Isso vai substituir o seu progresso atual. Continuar?")) {
        return;
    }

    localStorage.setItem(CHAVE_SAVE, JSON.stringify(save));
    saveExcluido = true; // impede que o jogo atual sobrescreva o save importado ao recarregar
    location.reload(); // ao recarregar, o carregarJogo() carrega o save importado
}


// inicialização
setInterval(salvarJogo, TEMPO_AUTOSAVE);
window.addEventListener("beforeunload", salvarJogo); // salva ao fechar a página

// botões do menu de configurações
const btn_Salvar = document.getElementById("btn-salvamento");
const btn_ExcluirSave = document.getElementById("btn-excluirsalvamento");

btn_Salvar.addEventListener("click", function () {
    salvarJogo();
    btn_Salvar.textContent = "Salvo!";
    setTimeout(() => {
        btn_Salvar.textContent = "Salvamento";
    }, 1500);
});

btn_ExcluirSave.addEventListener("click", excluirSave);

// exportar e importar save como texto
const btn_ExportarSave = document.getElementById("btn-exportarsave");
const btn_ImportarSave = document.getElementById("btn-importarsave");
const caixaCodigoSave = document.getElementById("codigo-save");

btn_ExportarSave.addEventListener("click", exportarSave);
btn_ImportarSave.addEventListener("click", importarSave);

carregarJogo();