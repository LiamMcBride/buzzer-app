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


// Create routes for database access
const router = express.Router();

//db endpoint
app.use('/db', router);

//db/find endpoint
router.route('/find').get( (req, res) => {
  console.log(`Request made: \n${req}`) //log that a request was made
});
router.route('/find/:caption').get(function(req, res) {
  
});

router.route('/update/:id').post( (req, res) => {

  console.log("update")
});

router.route('/create').post( (req, res) => {
  console.log("create")
});

// Export the app to be used in bin/www.js
module.exports = app;
