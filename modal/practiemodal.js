const mongoose = require("mongoose");




const practiceSchema = new mongoose.Schema({

    image:{
        type:Buffer
    }
});

const practice = mongoose.model('Practice',practiceSchema);

module.exports = practice;




