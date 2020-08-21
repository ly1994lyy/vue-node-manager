module.exports= app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/node-manager',{
        useNewUrlParser:true,
        useFindAndModify: false,
        useUnifiedTopology:true
    })
}