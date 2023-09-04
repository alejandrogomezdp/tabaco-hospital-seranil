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
    const {
        username,
        email,
        password,
        fullName,
        birthdate,
        address,
        phone,
        direccion,
        codigo_postal,
        ciudad,
        pais
    } = req.body;

    // Dividir el fullName en nombre y apellido
    const [nombre, ...rest] = fullName.split(' ');
    const apellidoGenerado = rest.join(' ');  // Cambié el nombre de la constante para evitar conflictos

    // Validación básica
    if (!username || !email || !password || !fullName) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validación del correo electrónico
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!re.test(email)) {
        return res.status(400).json({ error: 'Correo electrónico inválido' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.query(
        'INSERT INTO users (nombre, apellido, username, email, password_hash, birthdate, address, phone, direccion, codigo_postal, ciudad, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellidoGenerado, username, email, hashedPassword, birthdate, address, phone, direccion, codigo_postal, ciudad, pais],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Usuario registrado con éxito' });
        }
    );
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT password FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send("Usuario o contraseña incorrectos");
        }

        const hashedPassword = results[0].password;

        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            res.redirect('/');
        } else {
            res.status(400).send("Usuario o contraseña incorrectos");
        }
    });
});

app.listen(port, () => {
    console.log(`API server started on http://localhost:${port}`);
});
