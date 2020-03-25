const express = require('express');
const passport = require("passport")
const usersModel = require('../model/usersModel')
const itineraryModel = require('../model/itineraryModel')
const jwt = require("jsonwebtoken");
const router = express.Router()
const bcrypt = require('bcrypt');
const key = require("../keys")

/* router.get('/:userId',
	(req, res) => {
  		let favouriteRequested = req.params.userId;
  		usersModel.find({ userId: favouriteRequested })
			.then(favourite => {
				res.send(favourite)
			})
			.catch(err => console.log(err));
}); */

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    usersModel
      .findOne({ _id: req.user._id })
      .then(user => console.log(user))
      .catch(err => {
        res.status(404).json({ error: "User not found" });
      });
  }
);

router.post(
  '/:id/add', 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    usersModel
    .findOne({ _id: req.user._id })
    .then(user => {
      
     let favorite = user.favourites.filter(favorite => favorite._id === req.params.id)
     console.log(req.params.id)
     if(favorite.length === 0 ){
        // handle already liked itinerary
     itineraryModel 
     .findOne({_id: req.body.itineraryId})
     console.log(req.body.itineraryId)
     user.favourites.push({
      itineraryId: req.body.itineraryId,
      title: req.body.title,
      cityId: req.body.id
    });
  
      user.save()  
     }else{
        // handle not liked itinerary
        res.status(404).json({ error: "User already liked this itinerary!" });
     }
     console.log(user)
    })
    
    .catch(err => {
      res.status(404).json({ error: "User not found" });
    });
    
})


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
        .catch(err => console.log(err));
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
