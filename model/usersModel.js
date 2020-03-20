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
    
    googleAuth: {
        type: Boolean,
      },

    loginUser: {
      type: Boolean,
    },

    password: {
        type: String,
        required: function validate() {if(this.googleAuth) {return(false)}else{return (true)}},
      },
    
    picture: {
        type: String,
      },

    favorites: {
        type: Array,
      },
    
})
module.exports = mongoose.model('user', userSchema) 