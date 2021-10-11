const passportLocal = require('passport-local').Strategy;
const User = require("../modal/usermodal.js");
const bcrypt = require('bcryptjs')
const jwt  =require('jsonwebtoken')

function auth (passport) {
    passport.use( new passportLocal({usernameField:'username'},(username,password,done)=>{

        User.findOne({username:username},(err,user)=>{
            if(err){
                return done(null,{result:'Truble finding username'})
            }
            if(!user){
             return done(null,{result:'User does not exist'})   
            }
            bcrypt.compare(password,user.password, (error,ismatch)=>{
                if(err){
                    return done(null,{result:'Password Incorrect'}) 
                }
                if(ismatch){
                    const token = jwt.sign({
                        name: user.username,
                        id : user.id
                    },'sellandbuysecret30')
                    return done(null,{result:'success',user,token})
                }
            })
        })

    }))

}

module.exports = auth;