const express = require('express');
const router = express.Router();
const cityModel = require('../model/cityModel');

/*get all cities*/
router.get('/all',
    (req, res) => {
        cityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

    router.get('/:id',
    (req, res) => {
        cityModel.findOne({_id: req.params.id})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });
    
    router.post('/', (req, res) => {
        const newCity = new cityModel({
            name: req.body.name,
            country: req.body.country,
            image: req.body.image
        })
        newCity.save()
          .then(city => {
          res.send(city)
          })
          .catch(err => {
          res.status(500).send("Server error")}) 
    });

    module.exports = router