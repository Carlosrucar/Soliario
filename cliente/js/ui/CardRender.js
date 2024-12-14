export class CardRenderer {
    static createCardElement(card) {
        const element = document.createElement('div');
        element.classList.add('card');
        element.id = card.id;
        element.setAttribute('data-suit', card.suit);
        element.setAttribute('data-value', card.number);

        element.innerHTML = `
            <div class="card-number-top">${card.number}</div>
            <div class="card-suit">${card.suit}</div>
            <div class="card-number-bottom">${card.number}</div>
        `;

        return element;
    }
}