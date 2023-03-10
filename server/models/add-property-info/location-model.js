const mongoose = require("mongoose");

const locationInfoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        enum: ["delhi", "mumbai", "banglore", "hyderabad"],
        required: true
    },
    area: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    address: {
        type: String,
    },
    landmark: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    basicInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Basicinfo",
    }
})

module.exports = mongoose.model("Location", locationInfoSchema)