const express = require('express');
const path = require('path');
const notesData = require('./db/db.json')
const fs = require('fs');
const { v4: uuid4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Get notes json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
    return res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid4()
      };
      const response = {
        status: 'success',
        body: newNote,
      };
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
          console.error(err);
        } else {
            const newNotes = JSON.parse(data);
            newNotes.push(response.body);
            fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) => {
              if(err) {
                console.log(err)
              } else {
                console.log('New notes saved to array')
              }
            })
          }
        }
      )
    } else {
      res.status(500).json('Error in saving note')
    }
  });

// TODO - delete notes

app.listen(PORT, () => 
    console.log(`App running on http://localhost:${PORT}`)
);