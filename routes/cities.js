const express = require('express')

const router = express.Router()

router.get('/test', (req, res) => {
    res.send({ msg: 'Cities test route.' })

})
module.exports = router

const cityModel = require('../model/cityModel')

/*get all cities*/
router.get('/all',
    (req, res) => {
        cityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });