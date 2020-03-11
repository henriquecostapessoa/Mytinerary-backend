const express = require('express');

const User = require('../model/usersModel')

const router = express.Router()

const key = require("../keys");

const jwt = require("jsonwebtoken");

const passport = require("passport")
const bcrypt = require('bcrypt');

router.post("/", (req, res) => {
    //login user
    console.log(req.body.password) 
    const loginUser = User ({

      email: req.body.email,
      password: req.body.password
     
    })
          User.findOne({ email: req.body.email })
          .then(user => {
            if (!user) return res.status(400).json({ msg: "User not exist" })
            bcrypt.compare(req.body.password)
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
          })
          
          
        
  }); 

  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      login
        .findOne({ _id: req.user.id })
        .then(user => {
          res.json(user);
        })
        .catch(err => res.status(404).json({ error: "User does not exist!" }));
    }
  );

  module.exports = router

