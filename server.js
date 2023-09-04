const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Using environment variables for database credentials
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'eminem92AA!!', // Suggested moving to an environment variable
    database: 'tabacoHospital'
});

// Handle connection errors
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process with an error code
    }
    console.log('Connected to the database');
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
    console.log("Datos recibidos en el backend:", req.body);
    const { cantidad_cigarros, paquete_completo, id_marca, nombre_completo } = req.body;
    const currentDate = new Date();
    const fecha = currentDate.toISOString().split('T')[0];
    const hora = currentDate.toISOString().split('T')[1].split('.')[0];

    const query = `
        INSERT INTO transacciones (id_marca, nombre_completo, cantidad_cigarros, paquete_completo, fecha, hora)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [id_marca, nombre_completo, cantidad_cigarros, paquete_completo, fecha, hora], (err, results) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Datos guardados exitosamente!" });
    });
});

app.listen(port, () => {
    console.log(`API server started on http://localhost:${port}`);
});
