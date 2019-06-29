const express = require('express')

const app = express()

require('./plugins/db')(app)
require('./routers/api/users')(app)
app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})