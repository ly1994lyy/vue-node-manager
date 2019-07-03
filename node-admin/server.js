const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const passport = require('passport')

app.use(require('cors')())
app.use(express.json())

//使用body-parser中间件
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())



require('./plugins/db')(app)
require('./routers/api/users')(app)
require('./routers/api/profiles')(app)

//passport初始化
app.use(passport.initialize())
require('./config/passport')(passport)



app.listen(3000,()=>{
    console.log('http://localhost:3000')
})