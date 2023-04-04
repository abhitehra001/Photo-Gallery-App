const mongoose = require("mongoose");

const Photo = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Photos", Photo);