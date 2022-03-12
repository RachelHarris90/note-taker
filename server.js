const express = require('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json')

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Get notes json
app.get('/api/notes', (req, res) => 
    res.json(notesData)
);

// TODO - post request
// app.post('/api/notes', (req, res) => {
//   notesData = JSON.parse(data);
// })

app.listen(PORT, () => 
    console.log(`App running on http://localhost:${PORT}`)
);