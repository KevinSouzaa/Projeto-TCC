let gem = document.querySelector('.gem-cost')

let clickerCost = document.querySelector('.clicker-preco')
let parseClickerCost = parseFloat(clickerCost.innerHTML)

function incrementGem() {
    gem.innerHTML = parseFloat(gem.innerHTML) + 1
}

function comprarFrango() {
    if (parseFloat(gem.innerHTML) >= parseFloat(clickerCost.innerHTML)) {
        gem.innerHTML -= clickerCost.innerHTML
    }
    
}

