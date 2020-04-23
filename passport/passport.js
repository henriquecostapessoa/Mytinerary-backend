const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/usersModel");
const key = require("../keys");
const passport = require("passport");
const keys2 = require("./keys2")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id).then((user) => {
    done(null, user);
  });
});


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= key.secretOrKey;

module.exports = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  module.exports = passport.use(
    new GoogleStrategy({
    //options for the google strategy
      callbackURL:"/auth/google/redirect",
      clientID: keys2.google.clientID,
      clientSecret: keys2.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
      //passport call back function.
      console.log("passport callback function fired")
     
     User.findOne({ email: profile.emails[0].value })
     .then(user => { if(user){ user.loginUser = true
      user.save().then(res => done(null, res))
      console.log("if")
      }
       else{console.log("else")
        const newUser = new User ({
        username: profile.displayName,
        picture: profile.photos[0].value,
        email: profile.emails[0].value,
        googleAuth: true
       })
       newUser.save().then(user => done(null, user))   
      }
     }) 
      
    })
  );