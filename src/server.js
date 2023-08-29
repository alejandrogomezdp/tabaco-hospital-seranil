const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());

const port = 3001;

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

app.listen(port, () => {
    console.log(`API server started on http://localhost:${port}`);
});
