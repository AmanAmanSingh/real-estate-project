const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Guest'
    },
    password: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model("User", userSchema);