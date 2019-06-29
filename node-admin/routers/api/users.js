//登录和注册接口
module.exports= app =>{
    const express = require('express')
    const router = express.Router()

    router.get('/test',(req,res)=>{
        res.json(
            {msg:'login works'}
        )
    })

    app.use('/api/users',router)
}


