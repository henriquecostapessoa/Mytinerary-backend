const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
      },
    picture: {
        type: String,
        required: true
      },
    itineraryId: {
        type: String,
        required: true
      },
})
module.exports = mongoose.model('activity', activitySchema) 