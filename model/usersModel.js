const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },

    email: {
        type: String,
        required: true,
        unique: true
      },

    password: {
        type: String,
        required: function() { return this.type === ''; },
      },
    
    picture: {
        type: String,
      },
})
module.exports = mongoose.model('user', userSchema) 