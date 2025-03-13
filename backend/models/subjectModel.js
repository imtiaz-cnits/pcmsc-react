const mongoose =require('mongoose')


const subjectSchema = new mongoose.Schema({

    className : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Class',
        required: true
    }
}, {timestamps : true})


const Subject  = mongoose.model('Subject' , subjectSchema)


module.exports = Subject; 
