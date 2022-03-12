const express = require('express');
const path = require('path');
const db = require('./db/db.json')

const app = express();
const PORT = 3001;


// this will be used to store and retrieve notes using the fs module

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/INDEX.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Get notes json
app.get('/api/notes', (req, res) => 
    // fs
);

app.post('/api/notes', (req, res) => 
  //
);

app.listen(PORT, () => 
    console.log(`App running on http://localhost:${PORT}`)
);

// 