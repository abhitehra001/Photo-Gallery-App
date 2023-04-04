const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const authenticate = (req, res, next) => {
    if(req.session.token){
        const result = jwt.verify(req.session.token, process.env.JWT_SECRET_KEY)
            if(result.userId){
                req.userId = result.userId;
                req.pass = result.password;
                next();
            }else{
                res.status(200).json({
                    msg: "Session Expired! Please LogIn Again"
                })
            }
    }else{
        res.status(200).json({
            msg: "Please LogIn first"
        })
    }
}

module.exports = { authenticate };