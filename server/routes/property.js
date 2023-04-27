const express = require('express');
const router = express.Router();
const upload = require("../middelwares/multer");
const path = require("path");
const Authentication = require("../middelwares/jwt");
//IMPORT MODELS
const BasicInfo = require("../models/add-property-info/basic-model");
const generalInfo = require("../models/add-property-info/general-model");
const locationInfo = require("../models/add-property-info/location-model");
const propertyInfo = require("../models/add-property-info/propertydetail-model");


//POST END POINT FOR BASIC DETAILS 
router.post("/api/v4/basic", Authentication, async (req, res) => {

    try {
        const basicdetails = await BasicInfo.create({
            ...req.body,
            user: req.user
        });
        return res.status(200).json({
            message: "success",
            basicdetails,
            user: req.user
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
})


//POST END POINT FOR GENERAL DETAILS 
router.post("/api/v4/general", Authentication, upload, async (req, res) => {
    try {

        const { image } = req.file
        const generaldetails = await generalInfo.create({
            ...req.body,
            image: req.file.filename
        })
        return res.status(200).json({
            message: "success",
            generaldetails
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

})


//POST END POINT FOR LOCATION DETAILS 
router.post("/api/v4/location", Authentication, async (req, res) => {
    try {
        const locationdetails = await locationInfo.create(req.body);
        return res.status(200).json({
            message: "success",
            locationdetails,
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

})


//POST END POINT FOR PROPERTY DETAILS 
router.post("/api/v4/property", Authentication, async (req, res) => {
    try {

        const propertydetails = await propertyInfo.create(req.body)
        return res.status(200).json({
            message: "success",
            propertydetails
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
})


//GET ALL DATA OF A PROPERTY
router.get("/api/alldata", Authentication, async (req, res) => {
    try {

        const locationcollection = await locationInfo.find().populate({
            path: "generalInfo",
            select: "mobile image generalInfo -_id",
            populate: {
                path: "propertyInfo",
                select: "ppdid totalArea  propertyInfo -_id",
                populate: {
                    path: "basicInfo",
                    select: "property basicInfo -_id"
                }
            }
        }).select("-_id generalInfo propertyInfo basicInfo");

        return res.status(200).json({
            message: "success",
            locationcollection,
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


//IMAGES
router.get("/api/images/:fileName", (req, res) => {
    return res.sendFile(path.join(__dirname, `../uploads/${req.params.fileName}`))
})


module.exports = router;