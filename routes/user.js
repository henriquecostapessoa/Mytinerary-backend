const express = require('express');

const usersModel = require('../model/usersModel')

const router = express.Router()

/* const { check, validationResult } = require('express-validator'); */

/* router.post('/', [
  // username must be an email
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  userModel.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    picture: req.body.picture
  }).then(user => res.json(user));
}); */

router.post("/", (req, res) => {
  //create new user
  console.log(req.body.password) 
  const newUser = new usersModel({
    username: req.body.username,
    picture: req.body.picture,
    email: req.body.email,
    password: req.body.password
   
  })
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
}); 

/* router.post(
  "/",
  async (req, res) => {
      const {
          username,
          picture,
          email,
          password
      } = req.body;
      try {
         
          user = new usersModel({
              username,
              picture,
              email,
              password,
          });
          console.log(user)
          const payload = {
            user: {
                
                username: user.username,
                picture: user.picture,
                email: user.email,
                password: user.password,
            }
        };
          await user.save();
          

      } catch (err) {
          console.error(err.message);
          res.status(500).send("Server error");
      }
  }
);
 */
module.exports = router
