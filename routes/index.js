const express = require('express')
const jwt = require('jsonwebtoken')

const {Router} = express
const passport = require('passport')
const { authorization } = require('../config/passport')


const router = new Router()

router.post('/login', (req, res)=>{
    if(req.body.username == 'seba@gmail.com' && req.body.password == 'coderpass'){
        let token = jwt.sign(
            {email:req.body.username,password:req.body.password, role:'admin'},
            'codersecret',
            
        )
       res.cookie('cookieJwt', token)
        .send({message : 'User Loged', token})
    }
})

router.get('/home',passport.authenticate('jwt', {session:false}),authorization('admin') , (req, res)=>{
    
res.send('Bienvenido'+req.user)

})

module.exports = router