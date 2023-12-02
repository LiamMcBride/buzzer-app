/*
    Liam McBride (mailmcbride)
    HW 5
*/

// Import modules
const express = require('express');
const cors = require('cors');

// Set the web server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) =>
    res.send('<h1>Buzzer App Backend</h1>') // Home web page
);

let data = {
  players: []
};


// Create routes for database access
const router = express.Router();

//db endpoint
app.use('/db', router);

//db/find endpoint
router.route('/find').get( (req, res) => {
  // console.log(`Request made: \n${req}`); //log that a request was made
  res.json(data["players"]);
});

router.route('/join').post((req, res) => {
  const { name } = req.body;

  if (name !== "admin") {
    console.log(`Received name: ${name}`);
    data["players"].push(name);
    console.log(data["players"]);
    res.status(200).send(`Hello, ${name}!`);
  } else {
    res.status(400).send('Bad Request: Missing "name" in the request body.');
  }
});

router.route('/leave').post((req, res) => {
  const { name } = req.body;

  if (name) {
    console.log(`Received name: ${name}`);
    data["players"] = data["players"].filter((n) => n !== name)
    console.log(data)
    res.status(200).send(`Hello, ${name}!`);
  } else {
    res.status(400).send('Bad Request: Missing "name" in the request body.');
  }
});


// Export the app to be used in bin/www.js
module.exports = app;
