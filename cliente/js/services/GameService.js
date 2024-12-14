export class GameService {
    constructor(deck) {
        this.deck = deck;
        this.piles = {
            espada: [],
            oro: [],
            basto: [],
            copa: []
        };
    }

    resetGame() {
        this.deck.init();
        this.deck.shuffle();
        this.piles = {
            espada: [],
            oro: [],
            basto: [],
            copa: []
        };
        return true;
    }

    moveCard(cardId, targetPile) {
        if (this.piles[targetPile]) {
            this.piles[targetPile].push(cardId);
            return true;
        }
        return false;
    }
}