const express = require('express');
const path = require('path');
const notesData = require('./db/db.json')
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Get notes json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
    return res.json(JSON.parse(data));
  });
}

);

// POST request to add new note
// Append note to array in memory then write array each time (because it's required)
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
    };
    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note')
  }
  // TODO - push new data into array
});

// TODO - delete notes

app.listen(PORT, () => 
    console.log(`App running on http://localhost:${PORT}`)
);