const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta cliente
app.use(express.static(path.join(__dirname, '../cliente')));

// Store game state in memory (temporary solution)
let gameState = {
    cards: [],
    piles: {
        espada: [],
        oro: [],
        basto: [],
        copa: []
    }
};

// Routes
app.get('/api/game/state', (req, res) => {
    res.json(gameState);
});

app.post('/api/game/state', (req, res) => {
    gameState = req.body;
    res.status(201).json(gameState);
});

// Ruta para manejar todas las demás peticiones y servir index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../cliente/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});