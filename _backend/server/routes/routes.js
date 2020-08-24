const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../models/UserModel');


  module.exports= function routes(){

    async function redirectIfLoggedIn(req, res, next) {
      if (req.user){ 
        const user = await UserModel.findById(req.session.passport.user).exec();
        console.log(user.username)
        //return res.render('chat.ejs', {user : user.username});
        return res.redirect('http://localhost:4200/');
      } 
      return next();
    }

    router.get('/loginApplication', redirectIfLoggedIn,(req,res)=> {
        console.log('Inside loginApplication');
        return res.render('login.ejs');
    });
    
    router.get('/chatApplication',redirectIfLoggedIn,(req,res) => {
      return res.redirect(301,'/loginApplication')
    })

    router.get('/users/me',async function(req,res){
      console.log("Inside Requesy");
      const me = await UserModel.findById(req.session.passport.user).exec();
      console.log(me.username);
      return res.json({ username: me.username });
    })

    router.get('/',  redirectIfLoggedIn, (req,res) => {
      return res.redirect(301,'/loginApplication');
    });
    
    router.post('/', redirectIfLoggedIn, (req,res) => {
      return res.redirect(301,'/loginApplication');
    });
    
    router.post('/loginApplication', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/loginApplication?error=true',
    }));

    router.get('/registration', redirectIfLoggedIn, (req, res) => res.render('users/LoginApplication', { success: req.query.success }));
    
    router.post('/registration',  async (req, res, next) => {
      try {
        const user = new UserModel({
          username: req.body.username,
          password: req.body.password,
        });
        const savedUser =  await user.save();

        if (savedUser) {
          return res.redirect('/loginApplication');
        
        }
        console.log("Error in Registration")
        return next(new Error('Failed to save user for unknown reasons'));
      } catch (err) {
        console.log(err);
        return next(err);
      }
    });
    return router;
  }