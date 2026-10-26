
// Imagem principal do Personagem
const personagemImg = document.querySelector('.boneco-image');
const imgNormal = `${image_path.personagem}Fraco_1.png`;

// Imagem do personagem após clicar na tela
const imgClicado = `${image_path.personagem}Fraco_2.png`;

let tempoAnimacao;


// Troca as imagens do personagem ao clicar
personagemImg.addEventListener("click", function(){
    personagemImg.src = imgClicado;

    tempoAnimacao = setTimeout(() => {
        personagemImg.src = imgNormal;
    }, 180);
})