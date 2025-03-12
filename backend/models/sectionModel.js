// external imports 

const mongoose = require('mongoose')


// define the schema 
const sectionSchema = new mongoose.Schema({

    name : {
        type : String , 
        required : true,
        unique: true
    }
})

// create a model for the schema 
const Section = model('Section' , sectionSchema)

// exports 
export default Section; 