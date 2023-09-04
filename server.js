const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'eminem92AA!!',
    database: 'tabacoHospital'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
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

app.get('/transacciones-api', (req, res) => {
    db.query('SELECT * FROM transacciones', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Usuario registrado con éxito' });
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT password_hash FROM users WHERE username = ? OR email = ?', [username, username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, results[0].password_hash);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        res.json({ message: 'Inicio de sesión exitoso' });
    });
});

app.listen(port, () => {
    console.log(`API server started on http://localhost:${port}`);
});
