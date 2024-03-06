const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config()
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../recipe-recommender/build')));
}
else {
    app.use(cors());
}

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../recipe-recommender/build/index.html'));
});


db.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
