const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const initializatePassport = () => {
passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:'codersecret'
    }, async(jwt_payload, done) =>{
        try{
            console.log(jwt_payload)
return done(null, jwt_payload)
        }catch(err){
            return done(null, err) 
        }
}))
}
const cookieExtractor = (req)=>{
    let token = null
    if(req && req.cookies){
        token = req.cookies['cookieJwt']
    }
    return token
}
const authorization = (role)=>{
    return async (req, res, next)=>{
        if(!req.user) return res.status(401).send({error:'unauthorizated'})
        if(req.user.role != role)return res.status(403).send({error: 'no permission'})
    next();
    }
}
module.exports = {initializatePassport, authorization}