const express = require('express');
const activityModel = require('../model/activityModel');
const router = express.Router();

router.get('/:itineraryId',
	(req, res) => {
  		let activityRequested = req.params.itineraryId;
  		activityModel.find({ itineraryId: activityRequested })
			.then(activity => {
				res.send(activity)
			})
			.catch(err => console.log(err));
});

router.post('/:id/add', (req, res) => {
    
    const newActivity = new activityModel({
        itineraryId: req.params.id,
        title: req.body.title,
        picture: req.body.picture
    })
    
    newActivity.save()
      .then(activity => {
      res.send(activity)
      })
      .catch(err => {
      res.status(500).send("Server error")}) 
});

module.exports = router
