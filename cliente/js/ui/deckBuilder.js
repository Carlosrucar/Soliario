const CONFIG = {
    suits: ["espada", "oro", "basto", "copa"],
    suitNames: {
        espada: "Espada",
        oro: "Oro",
        basto: "Basto",
        copa: "Copa"
    }
};

export const deckBuilder = {
    builder: () => {
        const cardsContainer = document.getElementById('cards-container');
        let cardNum = 0;
        
        for (let i = 1; i <= 40; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = `card-${i}`;

            const suitIndex = Math.floor((i - 1) / 10);
            const suit = CONFIG.suits[suitIndex];
            card.setAttribute('data-suit', suit);
            
            cardNum++;
            if (cardNum > 10) cardNum = 1;
            card.setAttribute('data-value', cardNum);

            const topNumber = document.createElement('div');
            topNumber.classList.add('card-number-top');
            topNumber.textContent = cardNum;

            const suitName = document.createElement('div');
            suitName.classList.add('card-suit');
            suitName.textContent = CONFIG.suitNames[suit];

            const bottomNumber = document.createElement('div');
            bottomNumber.classList.add('card-number-bottom');
            bottomNumber.textContent = cardNum;

            card.appendChild(topNumber);
            card.appendChild(suitName);
            card.appendChild(bottomNumber);

            cardsContainer.appendChild(card);
        }
    },

    buildFromState: (gameState) => {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        
        const dropZones = {
            espada: document.getElementById('espada'),
            oro: document.getElementById('oro'),
            basto: document.getElementById('basto'),
            copa: document.getElementById('copa')
        };

        gameState.cards.forEach(cardData => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = cardData.id;
            card.setAttribute('data-suit', cardData.suit);
            card.setAttribute('data-value', cardData.value);

            const topNumber = document.createElement('div');
            topNumber.classList.add('card-number-top');
            topNumber.textContent = cardData.value;

            const suitName = document.createElement('div');
            suitName.classList.add('card-suit');
            suitName.textContent = CONFIG.suitNames[cardData.suit];

            const bottomNumber = document.createElement('div');
            bottomNumber.classList.add('card-number-bottom');
            bottomNumber.textContent = cardData.value;

            card.appendChild(topNumber);
            card.appendChild(suitName);
            card.appendChild(bottomNumber);

            // Check container and restore position
            if (cardData.container && cardData.container !== 'cards-container') {
                const zone = dropZones[cardData.suit];
                if (zone) {
                    card.style.position = "absolute";
                    const existingCards = Array.from(zone.querySelectorAll('.card'));
                    const cardCount = existingCards.length;
                    const newTop = 40 + (cardCount * 10);
                    card.style.top = `${newTop}px`;
                    zone.appendChild(card);
                } else {
                    cardsContainer.appendChild(card);
                }
            } else {
                cardsContainer.appendChild(card);
            }
        });
    }
};