const mongoose = require("mongoose");

const propertyDeatilScehma = new mongoose.Schema({
    length: {
        type: Number
    },
    breadth: {
        type: Number
    },
    totalArea: {
        type: Number,
        required: true
    },
    areaUnit: {
        type: String,
        enum: ["sqm", "acres", "hectares"],
        default: "sqm",
    },
    bhk: {
        type: Number,
    },
    floor: {
        type: Number
    },
    attached: {
        type: String,
        enum: ["yes", "no"],
        default: "yes",
    },
    westernToilet: {
        type: String,
        enum: ["yes", "no"],
        default: "yes"
    },
    furnished: {
        type: String,
        enum: ["yes", "no"],
        default: "no"
    },
    parking: {
        type: String,
        enum: ["yes", "no"],
        default: "no",
    },
    lift: {
        type: String,
        enum: ["yes", "no"],
        default: "no"
    },
    electricity: {
        type: String,
    },
    facing: {
        type: String,
        enum: ["east", "west", "north", "south"],
        default: "east",
    },
    basicInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "basicinfos",
    }
})

module.exports = mongoose.model("properties", propertyDeatilScehma)