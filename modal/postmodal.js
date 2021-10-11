const mongoose = require("mongoose");




const postSchema = new mongoose.Schema({
    username:{
        type:String,
       
    },
    heading:{
        type:String
    },
    details:{
        type:String,
        
    },
    price: {
        type:Number
    },
    category:{
        type:String
    },
    image:{
        type:String,
        
    }

});

const Post = mongoose.model('userPost',postSchema);

module.exports = Post;




