const express = require('express');

const loginModel = require('../model/loginModel')

const router = express.Router()

const key = require("../keys");

const jwt = require("jsonwebtoken");

const passport = require("passport")

router.post("/", (req, res) => {
    //login user
    console.log(req.body.password) 
    const loginUser = new loginModel({

      email: req.body.email,
      password: req.body.password
     
    })
          .save()
          .then(user => {
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
      loginModel
        .findOne({ _id: req.user.id })
        .then(user => {
          res.json(user);
        })
        .catch(err => res.status(404).json({ error: "User does not exist!" }));
    }
  );

  module.exports = router

