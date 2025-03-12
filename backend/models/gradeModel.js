const mongoose = require('mongoose')



const gradeSchema = new mongoose.Schema({

    minMarks : {
        type : String, 
        required : true
    },

    maxMarks : {
        type : String , 
        required : true
    },
    grade : {
        type : String, 
        required : true
    }
} , {timestamps : true}) 

const Grade  = mongoose.model('Grade' , gradeSchema)


module.exports = Grade