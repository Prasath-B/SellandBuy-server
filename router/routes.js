const express = require('express');
const passport = require('passport');
const mongoose = require("mongoose");
const router = express.Router();
const {registerUser,loginUser,createPost,getPost,getNumber,practice} = require('../handlers/handler.js')
const Post = require('../modal/postmodal');
const User = require('../modal/usermodal')
const multer = require('multer')
const Practice = require('../modal/practiemodal')


const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,"../client/public/uploads/")
  },
  filename:(req,file,callback) =>{
    callback(null,file.originalname)
  }
})

const upload = multer({storage:storage})

// const upload = multer();


router.post('/register', registerUser);
router.post('/login',loginUser)


router.post('/getpost',getPost)

router.post('/post',upload.single('file'),createPost)

router.post('/getnumber',getNumber)


router.post('/jwt',(req,res)=>{
  console.log(req.body)

  User.findOne({username: req.body.name},(err,user) =>{
    if(user){
      res.send('success')
    }else{
      res.send('failed')
    }
  })


})






 



module.exports = router;




// router.get('/image/:filename',(req,res)=>{

//   gfs.files.findOne({filename:req.params.filename},(err,file) =>{

//      if(!file || file.length === 0){
//     return res.status(404).json(

//       {
//         err:'No files'
//       }
//     )
//   }

//   if(file.contentType === 'image/jpeg' || file.contentType === 'image/jpeg'){
//     const readStream = gfs.createReadStream(file.filename);
//     readStream.pipe(response);
//   }else{
//     return res.status(404)
//   }
 

// })


//   })






