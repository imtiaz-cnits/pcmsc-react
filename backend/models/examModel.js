// external imports 
const mongoose = require('mongoose')


// define the schema 
const examSchema = new mongoose.Schema({

    name : {
        type : String, 
        required : true
    },

    subjects : [
        
    ]
})

const Exam = mongoose.model('Exam',examSchema)


module.exports = Exam; 