const { Client } = require('pg');
const express = require('express');

// create an express application
const app = express();
app.use(express.json());
// create a postgresql client

const client = new Client({
    host: 'ec2-54-83-60-13.compute-1.amazonaws.com',
    port: 5432,
    user: 'rusydaqqqjugzx',
    password: '6535fa0b8e78d2784f86fca4e503302f445f1f504d6f651ec4fbb64aef8274be',
  })

// route handlers go here
app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
});

app.get('/users/:id', (req, res) => {
   res.send(req.params)
});

app.post('/users', (req,res) => {
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = ['kenzie', 'Kenzie Academy is a user experience design and coding school in Indianapolis, Indiana. Our 6-month to 2-year program with 1-year paid apprenticeship is a new alternative to traditional colleges and short-term coding bootcamps.'];
    client.query(text, values, (err, result) => {
        res.send(result.rows)
    });
});

app.get('/create', (req,res) => {
    const text = 'CREATE TABLE users (id SERIAL PRIMARY KEY,username VARCHAR(15),bio VARCHAR(255))'
    client.query(text, values, (err, result) => {
        res.send(result.rows)
    });
});

// start a server that listens on port 3000 and connects the sql client on success
app.listen(3000, () => {
    client.connect();
});