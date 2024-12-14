export class Card {
    constructor(suit, number) {
        this.suit = suit;
        this.number = number;
        this.id = `card-${suit}-${number}`;
    }

    toString() {
        return `${this.number} de ${this.suit}`;
    }
}