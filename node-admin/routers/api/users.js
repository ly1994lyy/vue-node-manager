//登录和注册接口
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const User = require('../../models/Users')
    const bcrypt = require('bcrypt')
    const gravatar = require('gravatar')
    const jwt = require('jsonwebtoken')
    const passport = require('passport')

    router.get('/test',(req,res)=>{
        res.json(
            {msg:'login works'}
        )
    })

    //注册接口
    router.post('/register',(req,res)=>{
        User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json('邮箱已被注册!')
            }else{
                const url = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    identity:req.body.identity
                })
                //密码加密
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash)=> {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                                    .then(user=>res.json(user))
                                    .catch(err=>console.log(err))
                    });
                });
            }
        })
    })


    //登录接口
    router.post('/login',(req,res)=>{
        const email = req.body.email
        const password = req.body.password
        User.findOne({email})
                        .then(user => {
                            if(!user){
                                return res.status(400).json('用户不存在!')
                            }
                            bcrypt.compare(password, user.password)
                                .then(isMatch=>{
                                    if(isMatch){
                                        const rule = {
                                            id:user.id,
                                            name:user.name,
                                            avatar:user.avatar,
                                            identity:user.identity
                                        }
                                        jwt.sign(rule,'secret',{ expiresIn:3600 },(err,token)=>{
                                            if(err) throw err;
                                            res.json({
                                                success:true,
                                                token:'Bearer '+token
                                            })
                                        })
                                    }else{
                                        return res.status(400).json('密码错误')
                                    }
                                })
                        })
                        .catch()
    })


    router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
        res.json({
            id:req.user.id,
            name:req.user.name,
            email:req.user.email,
            identity:req.user.identity
        })
    })

    app.use('/api/users',router)
}


