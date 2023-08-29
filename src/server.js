const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alejandro',
    database: 'tabacoHospital'
});

app.get('/marcas', (req, res) => {
    db.query('SELECT * FROM marcas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get('/pacientes', (req, res) => {
    db.query('SELECT nombre_completo FROM pacientes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.post('/submit', (req, res) => {
    const { nombre_completo, numero_cigarros, paquete, fecha, hora } = req.body;
    const query = `
        INSERT INTO pacientes (nombre_completo, numero_cigarros, paquete, fecha, hora)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [nombre_completo, numero_cigarros, paquete, fecha, hora], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Datos guardados exitosamente!" });
    });
});

app.listen(port, () => {
    console.log(`API server started on http://localhost:${port}`);
});
