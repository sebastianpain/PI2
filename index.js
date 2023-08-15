const express = require('express')
const cookieParser = require('cookie-parser')
const routerAuth = require('./routes/index')
const passport = require('passport')
const { Router } = express
const { initializatePassport } = require('./config/passport')
const jwt = require('jsonwebtoken')
 const app = express()

app.use(express.json()) 
app.use(cookieParser())
app.use(passport.initialize())
initializatePassport()
app.use('/auth', routerAuth)


app.use(passport.initialize())
app.listen(8080,()=>{
    console.log('Server ok')
})