 const User = require('../modal/usermodal.js');
 const Post = require('../modal/postmodal')
 const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose')
const multer = require('multer')
const Practice = require('../modal/practiemodal')






 const registerUser = (req,res) =>{
     console.log(req.body);
     const username  = req.body.username;
     const password = req.body.password;
     const userstatus = req.body.userStatus;
     const phonenumber = req.body.phoneNumber;

     User.findOne({username:username})
     .then((user)=>{
         if(user){
             res.send({Error:'The username already exist'});
         }else{
        const newUser = new User({
        username,
        password,
        userstatus,
         phonenumber
     })

            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,(err,bcrypt,function(err,hash){
                    if(err) throw err ;
                    newUser.password = hash;
                    newUser.save();
                    
                }))
            })         
         }
     })
}

const loginUser = (req,res,next)=>{
     

    // console.log(req.headers.authorization);
    // console.log(req.headers);

    const user = new User({
    username:req.body.username,
    password: req.body.password
    });

    req.login(user, function(err) {
    if (err) {
      console.log(err);

    } else {
      passport.authenticate("local")(req, res, function(err) {
        if (err) {
          console.log(err);
          console.log("Error")
        } else {
            res.send(req.user)
         
        }
      });
    }
  });
}



  const createPost = (req,res) =>{
  
    console.log(req.headers.authorization);
    console.log(req.headers);

    const post = new Post({
      username:req.body.username,
      heading:req.body.heading,
      details:req.body.details,
      price:req.body.price,
      category:req.body.category,
      image:req.file.originalname

    })
    try {
       post.save();
     res.send({status:'ok'})
    } catch (error) {
      res.send(error)
    }
    
  }
      
  
  const getPost =   (req,res) =>{
   const {category} = req.body;
    Post.find({category:category}, async (err,docs)=>{
      if(!err){
        try {
          
           await res.send(docs)
           
        } catch (error) {
            res.send({Error:'Error'})
        }
        
      }else{
        console.log(err)
       
      }
    })
  }

  const getNumber = async(req,res)=>{
    const {username} = req.body;


    await User.findOne({ username: username }, 'phonenumber').exec()
   .then((result)=>{
     res.send(result) 
    
    })

  }


  const practice = (req,res)=>{
    console.log(req.post)
    console.log(req);

    res.send({status:'ok',file:req.file})
  }



module.exports = {registerUser,loginUser,createPost,getPost,getNumber,practice}