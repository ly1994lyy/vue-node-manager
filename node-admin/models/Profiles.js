const mongoose = require('mongoose')

const scheme = new mongoose.Schema({
    type:{
        type:String,
    },
    describe:{
        type:String,      
    },
    incode:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
})


module.exports=mongoose.model('Profile',scheme)