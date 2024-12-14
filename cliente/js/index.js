import { uiDrag } from './ui/uiDrag.js';
import { deckBuilder } from './ui/deckBuilder.js';
import { playerDeck } from './services/playerDeck.js';

// Función para iniciar el juego
async function initGame() {
    // Intentar cargar el estado guardado
    const savedState = await playerDeck.loadGameState();
    
    if (savedState && savedState.cards && savedState.cards.length > 0) {
        // Si hay estado guardado, restaurarlo
        deckBuilder.buildFromState(savedState);
    } else {
        // Si no hay estado guardado, crear nuevo mazo
        deckBuilder.builder();
        playerDeck.deckShuffle();
    }

    // Iniciar drag and drop
    uiDrag.init(".drop-zone", ".card");
}

// Iniciar el juego
initGame();

// Event listeners para los botones
document.getElementById('reset-game').addEventListener('click', async () => {
    await playerDeck.resetGame();
});

document.getElementById('sort-cards').addEventListener('click', () => {
    const container = document.getElementById('cards-container');
    const cards = Array.from(container.children);
    cards.sort((a, b) => {
        if (a.dataset.suit === b.dataset.suit) {
            return parseInt(a.dataset.value) - parseInt(b.dataset.value);
        }
        return a.dataset.suit.localeCompare(b.dataset.suit);
    });
    cards.forEach(card => container.appendChild(card));
    playerDeck.saveGameState(); // Guardar estado después de ordenar
});