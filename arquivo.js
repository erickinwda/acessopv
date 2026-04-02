// Lista de nomes de compradores
const buyers = ["João", "Ana", "Carlos", "Maria", "Pedro", "Lucas", "Fernanda", "Rafael", "Beatriz", "Juliana"];

// Lista de cidades
const cities = ["São Paulo", "Rio de Janeiro", "Curitiba", "Belo Horizonte", "Salvador", "Fortaleza", "Recife"];

// Lista de produtos disponíveis
const products = [
    "DRAGON, YETI OU KITSUNE",
    "GAMEPASS BUNDLE",
    "TRUE BLUE BUNDLE",
    "CAIXA DE FRUTAS",
    "CAIXA DE GAMEPASS",
    "FRUTA PERMANENTE",
    "MINK FULL V4",
    "CYBORG FULL V4",
    "SHARK FULL V4",
    "DRACO FULL V4"
];

// Selecionando o popup e a mensagem
const popup = document.getElementById('purchase-popup');
const msg = document.getElementById('pp-msg');

// Função que exibe o popup de compra
function showPurchasePopup() {
    // Sorteia dados aleatórios
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const product = products[Math.floor(Math.random() * products.length)];

    // Altera o texto do popup
    msg.innerHTML = `<b>${buyer}</b> de ${city} acabou de comprar <strong>${product}</strong>!`;

    // Exibe o popup
    popup.classList.add('show');

    // Esconde o popup após 3 segundos
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // Pop-up desaparece após 3 segundos
}

// Inicia o loop infinito a cada 5 segundos (5000ms)
setInterval(showPurchasePopup, 5000);

// Primeira execução após 2 segundos de carregar a página
setTimeout(showPurchasePopup, 2000);