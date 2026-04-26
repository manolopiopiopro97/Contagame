// Datos del juego - Técnicas de Contabilidad
const accountingData = [
    {
        id: 1,
        term: "Partida Doble",
        definition: "Cada transacción afecta al menos dos cuentas: un débito y un crédito",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        term: "Balance General",
        definition: "Estado financiero que muestra activos, pasivos y patrimonio",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        term: "Estado de Resultados",
        definition: "Muestra ingresos, gastos y utilidad o pérdida del período",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
    },
    {
        id: 4,
        term: "Libro Mayor",
        definition: "Registro donde se clasifican y resumen todas las cuentas",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop"
    },
    {
        id: 5,
        term: "Depreciación",
        definition: "Pérdida de valor de los activos fijos por el uso o tiempo",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
    },
    {
        id: 6,
        term: "Conciliación Bancaria",
        definition: "Proceso de comparar registros propios con el estado de cuenta",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=200&fit=crop"
    },
    {
        id: 7,
        term: "Inventario",
        definition: "Control y valoración de mercancías disponibles",
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=300&h=200&fit=crop"
    },
    {
        id: 8,
        term: "Flujo de Efectivo",
        definition: "Registro de entradas y salidas de dinero en efectivo",
        image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=300&h=200&fit=crop"
    }
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

// Crear pares de cartas (término y definición/imagen)
function createCardPairs() {
    const pairs = [];
    
    accountingData.forEach(item => {
        // Carta del término
        pairs.push({
            id: item.id,
            type: 'term',
            content: item.term,
            image: item.image,
            definition: item.definition
        });
        
        // Carta de la definición/imagen
        pairs.push({
            id: item.id,
            type: 'definition',
            content: item.definition,
            image: item.image,
            term: item.term
        });
    });
    
    return shuffleArray(pairs);
}

// Algoritmo de Fisher-Yates para mezclar
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Crear elemento de carta HTML
function createCardElement(cardData, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = cardData.id;
    card.dataset.index = index;
    
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
            </div>
            <div class="card-back">
                <img src="${cardData.image}" alt="${cardData.type === 'term' ? cardData.content : cardData.term}" 
                     onerror="this.src='https://via.placeholder.com/150x100/667eea/ffffff?text=Contabilidad'">
                <div class="term">${cardData.type === 'term' ? cardData.content : cardData.term}</div>
                <div class="definition">${cardData.type === 'term' ? cardData.definition : cardData.content}</div>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => flipCard(card));
    return card;
}

// Voltear carta
function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

// Verificar si hay coincidencia
function checkMatch() {
    canFlip = false;
    const [card1, card2] = flippedCards;
    const match = card1.dataset.id === card2.dataset.id;
    
    if (match) {
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            document.getElementById('pairs').textContent = matchedPairs;
            flippedCards = [];
            canFlip = true;
            
            // Verificar victoria
            if (matchedPairs === accountingData.length) {
                setTimeout(() => {
                    alert(`🎉 ¡Felicidades! Completaste el juego en ${moves} movimientos`);
                }, 500);
            }
        }, 600);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1200);
    }
}

// Inicializar juego
function initGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    cards = createCardPairs();
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    
    document.getElementById('moves').textContent = moves;
    document.getElementById('pairs').textContent = matchedPairs;
    
    cards.forEach((cardData, index) => {
        const cardElement = createCardElement(cardData, index);
        gameBoard.appendChild(cardElement);
    });
}

// Iniciar al cargar
window.addEventListener('DOMContentLoaded', initGame);