const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'user'
    },

    username: {
        type: String
    },

    img: {
        type: String
    },

    itineraryId: {
        type: String, 
        
    },

    date: {
        type: Date,
        default: Date.now
    },

    text: {
        type: String,
        required: true
    }
});

module.exports = Comment = mongoose.model('comment', commentSchema)