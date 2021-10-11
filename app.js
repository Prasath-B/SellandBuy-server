const express = require("express");
const mongoose = require("mongoose");
const bodyParser =require("body-parser")
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const router = require('./router/routes.js')
const jwt  =require('jsonwebtoken');
const dotenv = require('dotenv').config()


const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


require("./config/strategy")(passport);

app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.json({limit:'50mb'}));


const dbURL = `mongodb+srv://prasath:balpraman@cluster0.r6mvm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

 mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




app.use(session({
    secret:'Thisismybuyandsellwebsite',
    resave:true,
    saveUninitialized:true,
}));

app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



app.use(router)

app.listen(process.env.PORT || '5000',()=>{
     console.log('server is runnig on port 5000');
 })


















