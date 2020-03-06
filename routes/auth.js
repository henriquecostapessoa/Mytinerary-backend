const express = require('express');
const passport = require("passport")
const router = express.Router()

//auth login
/* router.get("/loginpage", (req, res) =>{
    res.render("Loginpage")
}); */

//auth logout
router.get("/logout", (req, res) =>{
    //handle with passport
    res.send("logging out")
})


//auth with google
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send ("you reached the callback URL")
})
module.exports = router;