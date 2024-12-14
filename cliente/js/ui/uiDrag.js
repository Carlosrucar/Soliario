export const uiDrag = {
    init: (dropZoneSelector, draggableSelector) => {
        const zones = document.querySelectorAll(dropZoneSelector);
        const draggables = document.querySelectorAll(draggableSelector);

        // Mensaje de error
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(255, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            display: none;
            z-index: 1000;
        `;
        document.body.appendChild(errorMessage);

        // Configurar elementos arrastrables
        draggables.forEach(card => {
            card.setAttribute("draggable", true);
            card.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", card.id);
            });
        });

        // Configurar zonas de drop
        zones.forEach(zone => {
            // Añadir dragover event - IMPORTANTE
            zone.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            zone.addEventListener("drop", async (e) => {
                e.preventDefault();
                const cardId = e.dataTransfer.getData("text/plain");
                const card = document.getElementById(cardId);

                if (zone.id === card.dataset.suit) {
                    const existingCards = Array.from(zone.querySelectorAll('.card'));
                    const cardCount = existingCards.length;
                    const baseTop = 40;
                    const stackOffset = 10;
                    const newTop = baseTop + (cardCount * stackOffset);

                    card.style.position = "absolute";
                    card.style.top = newTop + "px";
                    
                    if (!zone.contains(card)) {
                        zone.appendChild(card);
                        // Importar playerDeck de forma correcta
                        const { playerDeck } = await import('../services/playerDeck.js');
                        await playerDeck.saveGameState();
                    }
                } else {
                    errorMessage.textContent = `Esta carta debe ir en el contenedor de ${card.dataset.suit}`;
                    errorMessage.style.display = 'block';
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 2000);
                }
            });
        });
    }
};