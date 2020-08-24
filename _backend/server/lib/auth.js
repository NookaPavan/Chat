const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel');



passport.use(new LocalStrategy(
    (username, password, done) => {
      console.log('Inside local strategy callback')
      // here is where you make a call to the database
      // to find the user based on their username or email address
      // for now, we'll just pretend we found that it was users[0]
      try{
        const user = UserModel.findOne({username : username}).exec();
        if(!user){
          return done(null,user, {message: 'Invalid username or password'});
        }
        const passwordOK = user.comparePassword(password);
        if (!passwordOK) {
            return done(null, false, { message: 'Invalid username or password' });
        }
      }catch(err){
          return done(err);
      }
    }
  ));
  
  // tell passport how to serialize the user
  passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(`The user id passport saved in the session file store is: ${id}`)
    try{
       const user = UserModel.findById(id).exec(); 
        done(null, user);
    }catch(err){
        return done(err);
    }
    
  });

  module.exports = {
      intialize : passport.initialize(),
      session: passport.session(),      
      setUser: (req, res, next) => {
        res.locals.user = req.user;
        return next();
      },
  };    