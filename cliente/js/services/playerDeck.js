export const playerDeck = {
    deckShuffle: () => {
        const container = document.getElementById('cards-container');
        const cards = Array.from(container.children);
        for (let i = 0; i < 10; i++) {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                container.appendChild(container.removeChild(cards[j]));
            }
        }
    },

    resetGame: () => {
        const cardsContainer = document.getElementById('cards-container');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        dropZones.forEach(zone => {
            const cards = Array.from(zone.querySelectorAll('.card'));
            cards.forEach(card => {
                card.style.position = 'relative';
                card.style.top = '0';
                cardsContainer.appendChild(card);
            });
        });
        
        playerDeck.deckShuffle();
    },

    saveGameState: async () => {
        try {
            const gameState = {
                cards: Array.from(document.querySelectorAll('.card')).map(card => ({
                    id: card.id,
                    suit: card.dataset.suit,
                    value: card.dataset.value,
                    container: card.parentElement.id,
                    position: card.style.top || '0px'
                })),
                piles: {
                    espada: [],
                    oro: [],
                    basto: [],
                    copa: []
                }
            };

            await fetch('http://localhost:3000/api/game/state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameState)
            });
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    },

    loadGameState: async () => {
        try {
            const response = await fetch('http://localhost:3000/api/game/state');
            const gameState = await response.json();
            return gameState;
        } catch (error) {
            console.error('Error loading game state:', error);
            return null;
        }
    }
};