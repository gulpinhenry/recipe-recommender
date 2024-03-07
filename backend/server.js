const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config( { path: './backend/.env' } )

const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../recipe-recommender/build')));
}
else {
    // app.use(cors());
}

// app.get('/message', (req, res) => {
//     res.json({ message: "Hello from server!" });
// });
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../recipe-recommender/build/index.html'));
});


db.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

process.on("uncaughtException", function (err) {
    console.log("Caught exception: " + err);
});
