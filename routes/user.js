const express = require('express');

const usersModel = require('../model/usersModel')

const router = express.Router()
const bcrypt = require('bcrypt');



router.post("/", async (req, res) => {
  //create new user
  console.log(req.body.password) 
  const hash = await bcrypt.hash(req.body.password, 12);
  console.log(hash)
  const newUser = new usersModel({
    username: req.body.username,
    picture: req.body.picture,
    email: req.body.email,
    password: hash
   
  })
  
  
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
}); 


module.exports = router
