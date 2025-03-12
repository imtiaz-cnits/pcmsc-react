// external imports 

const mongoose = require('mongoose')


// define class schema 

const classSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        unique : true
    }
} , {timestamps : true})

// create model from the schema 
const ClassModel = mongoose.model('Class' , classSchema)


// exports 
module.exports = ClassModel; 