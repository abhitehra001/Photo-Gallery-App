const Photo = require("../models/Photo");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const addPhoto = (req, res) => {
    const { label, imageUrl } = req.body;
    const photo = new Photo({
        label, imageUrl, userId: req.userId
    })
    photo.save().then(result => {
        if(result){
            res.status(200).json({
                msg: "Photo Saved Successfully"
            })
        }else{
            res.status(200).json({
                msg: "Photo Saving Failed"
            })
        }
    }).catch(err => {
        res.status(200).json({
            msg: "Invalid Credentials"
        })
    })
}

const viewPhotos = (req, res) => {
    Photo.find({ userId: req.userId }).then(result => {
        res.status(200).json({
            result
        })
    }).catch(err => {
        res.status(200).json({
            msg: "Error in fetching the data"
        })
    })
}

const deletePhoto = (req, res) => {
    Photo.findById(req.body.photoId).then(data => {
        if(data){
            if(data.userId===req.userId){
                User.findById(req.userId).then(user=>{
                    bcrypt.compare(req.body.password, user.password).then((result) => {
                        if(result){
                            Photo.findByIdAndDelete(req.body.photoId).then(deleted=>{
                                res.status(200).json({
                                    msg: "Photo Deleted Successfully"
                                })
                            })
                        }else{
                            res.status(200).json({
                                msg: "Password Incorrect"
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                        res.status(200).json({
                            msg: "Incorrect Password"
                        })
                    })
                })
            }else{
                res.status(200).json({
                    msg: "User Unauthorised"
                })
            }
        }else{
            res.status(200).json("Photo not found in Database")
        }
    })
}

module.exports = { addPhoto, viewPhotos, deletePhoto };