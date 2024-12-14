import { Card } from '.Card.js';

export class Deck {
    constructor() {
        this.cards = [];
        this.init();
    }

    init() {
        const suits = ["espada", "oro", "basto", "copa"];
        suits.forEach(suit => {
            for(let i = 1; i <= 10; i++) {
                this.cards.push(new Card(suit, i));
            }
        });
    }

    shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}