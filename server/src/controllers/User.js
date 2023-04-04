const dotenv = require("dotenv");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const registerUser = (req, res) => {
    const { name, email, phone, password } = req.body
    bcrypt.hash(password, parseInt(process.env.SALTROUNDS), (err, hashedPassword) => {
        if(err || !hashedPassword){
            res.status(200).json({
                msg:"Error in Hashing Password"
            })
        }else{
            const user = new User({
                name, email, phone, password: hashedPassword
            })
            user.save().then(data=>{
                if(data){
                    res.status(200).json({
                        msg:"Registered Successfully"
                    })
                }else{
                    res.status(200).json({
                        msg:"Invalid Credentials"
                    })
                }
            }).catch(err=>{
                res.status(200).json({
                    msg: err.data.message
                })
            })
        }
    })
}

const loginUser = (req, res) => {
    const { person, password } = req.body;
    if(/^[0-9]*$/.test(person)){
        User.findOne({ phone:person }).then(data=>{
            if(data){
                bcrypt.compare(password, data.password).then(async(result)=>{
                    if(result){
                        jwt.sign({
                            userId: data._id,
                            password: data.password,
                            data: Date.now()
                        }, process.env.JWT_SECRET_KEY)
                        req.session.token = token;
                        res.status(200).json({
                            msg: "Logged In Successfully"
                        })
                    }else{
                        res.status(200).json({
                            msg: "Password Incorrect"
                        })
                    }
                })
            }else{
                res.status(200).json({
                    msg: "Phone Number not registered"
                })
            }
        })
    }else{
        User.findOne({ email:person }).then(data=>{
            if(data){
                bcrypt.compare(password, data.password).then(async(result)=>{
                    if(result){
                        const token = await jwt.sign({
                            userId: data._id,
                            pass: data.password,
                            data: Date.now()
                        }, process.env.JWT_SECRET_KEY)
                        req.session.token = token;
                        res.status(200).json({
                            msg: "Logged In Successfully"
                        })
                    }else{
                        res.status(200).json({
                            msg: "Password Incorrect"
                        })
                    }
                })
            }else{
                res.status(200).json({
                    msg: "Email not registered"
                })
            }
        })
    }
}

const logoutUser = (req, res) => {
    req.session.token = "";
    res.status(200).json({
        msg: "Logged Out Successfully"
    })
}

const userInfo = (req, res) => {
    User.findById(req.userId).then(user=>{
        if(user){
            const {name, email} = user;
            res.status(200).json({
                msg: "User Found",
                name,
                email
            })
        }else{
            res.status(200).json({
                msg: "User not Found"
            })
        }
    }).catch(err => {
        res.status(200).json({
            msg: "User not registered"
        })
    })
}

module.exports = { registerUser, loginUser, logoutUser, userInfo };