const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const generation = require('./age');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


const db = new sqlite3.Database('genx.db', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Az adatbázis kapcsolat létrejött.');
    }
});

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        birthdate DATE NOT NULL,
        age TEXT NOT NULL,
        gen TEXT NOT NULL
        )`);


app.post('/api/generations', (req, res) => {
    const { name, birthdate } = req.body;
    const genObj = new generation.Generations(birthdate);
    const userage = genObj.getAge();
    const usergen = genObj.getGeneration();

    db.run(`INSERT INTO users (name, birthdate, age, gen) VALUES (?, ?, ?, ?)`,
        [name, birthdate, userage, usergen],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send({ message: 'Sikeres adatrögzítés.', id: this.lastID, name, birthdate, userage, usergen });
        });
});

app.get('/api/generations', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Hiba történt az adatok kiolvasása során' });
        } 
        res.status(200).json(data);
    });

});

app.delete('/api/generations/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM users WHERE id = ?`, [id], 
        function (err) {
            if (err) {
                return res.status(500).send(err.message);
            } else {
                res.status(204).json( { message: 'Sikeres adattörlés!' });
            }

        });
});

app.listen(port, () => {
    console.log(`A szerver fut a http://localhost:${port} számú porton.`)
})
