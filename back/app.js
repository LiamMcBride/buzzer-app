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
  players: [],
  queue: [],
  blocked: [],
  kick: "default",
  start: false
};


// Create routes for database access
const router = express.Router();

//db endpoint
app.use('/db', router);

//db/find endpoint
router.route('/find').get( (req, res) => {
  // console.log(`Request made: \n${req}`); //log that a request was made
  // console.log(data);
  res.json(data);
});

router.route('/join').post((req, res) => {
  const { name } = req.body;
  if (data["players"].includes(name)) {
    res.status(400).send(`Name taken, try another`);
  }
  else if (name !== "admin") {
    console.log(`Received name: ${name}`);
    data["players"].push(name);
    console.log(data["players"]);
    res.status(200).send(`Hello, ${name}!`);
  } else {
    res.status(400).send('Bad Request: Missing "name" in the request body.');
  }
});

router.route('/start').post((req, res) => {
  data["start"] = true;
});

router.route('/stop').post((req, res) => {
  data["start"] = false;
});

router.route('/enqueue').post((req, res) => {
  const { name } = req.body;
  var queued = false;
  data["queue"].forEach(function(elem, i) { // make sure the name is not already queued
    if (elem == name) {
      queued = true;
    }
  });

  if (!queued) {
    console.log(`Received name: ${name}`);
    data["queue"].push(name);
    data["blocked"].push(name);
    console.log(data["queue"]);
    res.status(200).send(`Hello, ${name}!`);
  } else {
    res.status(400).send('Bad Request: Already queued');
  }
});

router.route('/clear').post((req, res) => {
  data["queue"] = [];
  data["blocked"] = [];
  res.status(200).send("Cleared the queue");
});

router.route('/dequeue').post((req, res) => {

  var newQueue = [];

  if (data["queue"].length > 1) {
    for (let i = 1; i < data["queue"].length; i++) {
      newQueue.push(data["queue"][i]);
    }
  }
  console.log(newQueue);
  data["queue"] = newQueue;
  res.status(200).send("Dequeued");
});

router.route('/leave').post((req, res) => {
  const { name } = req.body;

  if (name) {
    console.log(`Received name: ${name}`);
    data["players"] = data["players"].filter((n) => n !== name)
    data["queue"] = data["queue"].filter((n) => n !== name)
    data["blocked"] = data["blocked"].filter((n) => n !== name)
    console.log(data)
    res.status(200).send(`Hello, ${name}!`);
  } else {
    res.status(400).send('Bad Request: Missing "name" in the request body.');
  }
});

router.route('/kick').post((req, res) => {
  const { name } = req.body;

  if (name) {
    console.log(`Received name: ${name}`);
    data["kick"] = name;
    data["players"] = data["players"].filter((n) => n !== name)
    data["queue"] = data["queue"].filter((n) => n !== name)
    data["blocked"] = data["blocked"].filter((n) => n !== name)
    console.log(data)
    res.status(200).send(`Hello, ${name}!`);
  } else {
    res.status(400).send('Bad Request: Missing "name" in the request body.');
  }
});


// Export the app to be used in bin/www.js
module.exports = app;
