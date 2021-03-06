const passport = require("passport");
const mongoose = require("mongoose");
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


const db = require('./keys').mongoURI;

mongoose.connect(process.env.mongoURI || db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
//passport configuration
require("./passport/passport");

app.use('/cities', require('./routes/cities'))
app.use('/itineraries', require('./routes/itineraries'))
app.use('/activities', require('./routes/activities'))
app.use('/user', require('./routes/user'))
app.use('/login', require('./routes/login'))
app.use("/auth", require("./routes/auth"))

if(process.env.NODE_ENV === "production")
{
  app.use(express.static("myitinerary/build"))
}