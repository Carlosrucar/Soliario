import { CardRenderer } from './CardRenderer.js';

export class GameUI {
    constructor(gameService) {
        this.gameService = gameService;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('reset-game')
            .addEventListener('click', () => this.handleReset());
        document.getElementById('sort-cards')
            .addEventListener('click', () => this.handleSort());
    }

    handleReset() {
        this.gameService.resetGame();
        // Actualizar UI
    }

    handleSort() {
        const container = document.getElementById('cards-container');
        const cards = Array.from(container.children);
        cards.sort((a, b) => {
            if (a.dataset.suit === b.dataset.suit) {
                return parseInt(a.dataset.value) - parseInt(b.dataset.value);
            }
            return a.dataset.suit.localeCompare(b.dataset.suit);
        });
        cards.forEach(card => container.appendChild(card));
    }
}