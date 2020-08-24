const express = require('express');
const app = express();
var cors = require('cors');
const http = require('http').Server(app);
const path = require('path');
const io= require('socket.io')(http);
const session= require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const createError = require('http-errors');
const {v4: uuid} = require('uuid');
//const io= require('./lib/sockets');
//const auth = require('./lib/auth');
//const config = require('./config/index.js')[process.env.NODE_ENV.toString() || 'development'];
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/UserModel');
const { UserMsg } = require('./models/user');
const port = 8080;
  
  app.set('view engine', 'ejs');
  app.set("views",path.join(__dirname+"/static"));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(function myCors(req, res, nxt) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    if(req.method === 'OPTIONS') {
        res.sendStatus(204);
    }
    else {
        nxt();
    }
});
  app.use(cookieParser());
  app.use(session({
      genid: (req)=> {
          return uuid();
      },
      store: new MongoStore({ mongooseConnection: mongoose.connection }), 
      secret: 'what the hell corona',
      resave: false,
      saveUninitialized: true,
      cookie : { httpOnly: true, secure : false, maxAge : (4 * 60 * 60 * 1000)} 
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(routes());
  passport.use(new LocalStrategy(
     async (username, password, done) => {
      try{
        const user =  await UserModel.findOne({username : username}).exec();
         // here is where you make a call to the database
         // to find the user based on their username or email address
        if(!user){ //check for users existence 
          return done(null,user, {message: 'Invalid username or password'});
        }
        const passwordOK = await user.comparePassword(password); //compare password
        if (!passwordOK) {
            return done(null, false, { message: 'Invalid username or password' }); //not found. Send the error message to callback
        }
        return done(null, user); //return user to callback
      }catch(err){
          console.log(err);
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
        console.log(err);
        return done(err);
    }
    
  });
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500; // If no status is provided, let's assume it's a 500
    res.locals.status = status;
    res.status(status);
    res.render('error');
  });

  Actives=[];
  io.sockets.on('connection', function(socket) {
    socket.on('username', function(name) {
        socket.username= name;
        Actives.push(name);
        io.emit('is_online',  {name:socket.username, status:"connected",actives:Actives});
    });

    socket.on('disconnect', function() {
      Actives.splice(Actives.indexOf(socket),1);
      io.emit('is_online', {name:socket.username, status:"disconnected",actives:Actives});
    })

    socket.on('chat_message', function(msg) {
      io.emit('chat_message', msg);
    });

    socket.on('isTyping',function(name) {
        io.emit('is_typing', name );
    })

  });
  mongoose.connect(""/*MongoDb Connection string*/, {useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB');
    http.listen(port, () =>{
      console.log(`listening on *:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
