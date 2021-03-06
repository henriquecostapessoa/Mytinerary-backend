const express = require('express');
const itineraryModel = require('../model/itineraryModel');
const router = express.Router();

router.get('/:cityId',
	(req, res) => {
  		let itineraryRequested = req.params.cityId;
  		itineraryModel.find({ cityId: itineraryRequested })
			.then(itinerary => {
				res.send(itinerary)
			})
			.catch(err => console.log(err));
});

router.post('/:id/add', (req, res) => {
    
    const newItinerary = new itineraryModel({
        cityId: req.params.id,
        title: req.body.title,
        rating: req.body.rating,
        duration: req.body.duration,
        price: req.body.price,
        hashtags: req.body.hashtags,
        profilepicture: req.body.profilepicture,
        map: req.body.map
    })
    
    newItinerary.save()
      .then(itinerary => {
      res.send(itinerary)
      }) 
      
      .catch(err => {
        res.send(err.message )}) 
});

module.exports = router


