const mongoose = require("mongoose");

const requiredSchema = new mongoose.Schema({
    ppdid: {
        type: String,
        default: function () {
            const year = new Date().getFullYear().toString().substr(-2);
            const randomNum = Math.floor(Math.random() * 9000) + 1000;
            return `PPDID${year}${randomNum}`;
        }
    },
    image: {
        type: String,
    },
    property: {
        type: String,
        enum: ["plot", "house", "flat"],
        default: "plot"
    },
    mobile: {
        type: String
    }

})

module.exports = mongoose.model("require", requiredSchema)