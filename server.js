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
    db.query('SELECT * FROM Marcas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get('/pacientes', (req, res) => {
    db.query('SELECT nombre_completo FROM Pacientes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.post('/submit', (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);
    const { cantidad_cigarros, paquete_completo, id_paciente, id_marca, fecha, hora } = req.body;
    const query = `
        INSERT INTO Transacciones (id_paciente, id_marca, cantidad_cigarros, paquete_completo, fecha, hora)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [id_paciente, id_marca, cantidad_cigarros, paquete_completo, fecha, hora], (err, results) => {
        if (err) {
            console.error("Error al insertar en la base de datos:", err); // Esto te dará más detalles sobre el error
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Datos guardados exitosamente!" });
    });
});

app.listen(port, () => {
    console.log(`API server started on http://localhost:${port}`);
});
