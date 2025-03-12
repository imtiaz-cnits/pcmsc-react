// external imports 
const mongoose = require('mongoose')

// define the schema 
const shiftSchema = new mongoose.Schema({

    name : {
        type : String , 
        required : true,
        unique : true
    }
} , {timestamps : true})

// create a model for the schema 
const Shift = mongoose.model('Shift' , shiftSchema)

// exports 
module.exports = Shift; 