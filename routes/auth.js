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
    req.logout()
    res.redirect('http://localhost:3000')
})


//auth with google
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google", { session: false }), (req, res) => {
    const user = req.user;
    console.log(req.user)
    user => {
        const payload = {
            id: user.id,
            username: user.username,
            picture: user.picture
        };
        const options = {expiresIn: 2592000};
    jwt.sign(
    payload,
    key.secretOrKey,
    options,
    (err, token) => {
    if(err){
    res.json({
    success: false,
    token: "There was an error"
    });
    }else {
    res.json({
    success: true,
    token: token
    });
    }
    }
    );
      }
    res.send ("you reached the callback URL")
})


module.exports = router;