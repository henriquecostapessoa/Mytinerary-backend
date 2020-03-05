const passport = require("passport")

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.use('/cities', require('./routes/cities'))
app.use('/itineraries', require('./routes/itineraries'))
app.use('/activities', require('./routes/activities'))
app.use('/user', require('./routes/user'))
app.use('/login', require('./routes/login'))
//passport middleware
app.use(passport.initialize());
//passport configuration
require("./passport/passport");

const db = require('./keys').mongoURI;

const mongoose = require("mongoose");

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));