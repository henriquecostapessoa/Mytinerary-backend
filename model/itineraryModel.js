const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
      },
    rating: {
        type: String,
        required: true
      },
    duration: {
        type: String,
        required: true
      },
    price: {
        type: String,
        required: true
      },  
    hashtags: {
        type: String,
        required: true
      },      
    profilepicture: {
        type: String,
      },

    map: {
        type: String,
      },
      
    cityId: {
        type: String,
        required: true
      }
})
module.exports = mongoose.model('itinerary', itinerarySchema)    