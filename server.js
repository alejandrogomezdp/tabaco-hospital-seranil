const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // para evitar problemas CORS en el desarrollo local
app.use(bodyParser.json());

let stock = 0; // variable que representa el stock. En un caso real, deberías usar una base de datos.

// Endpoint para obtener el stock actual
app.get('/stock', (req, res) => {
    res.json({ stock });
});

// Endpoint para incrementar el stock
app.post('/addStock', (req, res) => {
    const { incrementValue } = req.body;
    stock += incrementValue;
    res.json({ stock });
});

// Endpoint para reducir el stock
app.post('/subtractStock', (req, res) => {
    const { decrementValue } = req.body;
    if (stock - decrementValue < 0) {
        res.status(400).json({ error: 'Stock insuficiente' });
        return;
    }
    stock -= decrementValue;
    res.json({ stock });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
