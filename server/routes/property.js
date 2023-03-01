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
router.post("/api/v4/basic", async (req, res) => {
    // console.log(req.body)
    try {
        const { property, negotable, price, ownership, propertyAge,
            propertyApproved, propertyDescription, bankLoan } = req.body

        const basicdetails = await BasicInfo.create({
            property,
            negotable,
            price,
            ownership,
            propertyAge,
            propertyApproved,
            propertyDescription,
            bankLoan
        })
        return res.status(200).json({
            message: "success",
            basicdetails
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
})


//POST END POINT FOR GENERAL DETAILS 
router.post("/api/v4/general", upload, async (req, res) => {
    try {

        const { image } = req.file
        const { username, mobile, postedby, saletype, feature, PPDpackage } = req.body

        const generaldetails = await generalInfo.create({
            username, mobile,
            postedby, saletype,
            feature, PPDpackage,
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
router.post("/api/v4/location", async (req, res) => {
    try {
        const { email, city, area, pincode, address, landmark, latitude, longitude } = req.body
        const locationdetails = await locationInfo.create({
            email, city, area,
            pincode, address, landmark,
            latitude, longitude
        })
        return res.status(200).json({
            message: "success",
            locationdetails
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

})


//POST END POINT FOR PROPERTY DETAILS 
router.post("/api/v4/property", async (req, res) => {
    try {
        const { length, breadth, totalArea, areaUnit, bhk, floor, attached,
            westernToilet, furnished, parking, lift, electricity, facing } = req.body

        const propertydetails = await propertyInfo.create({
            length, breadth, totalArea,
            areaUnit, bhk, floor, attached,
            westernToilet, furnished,
            parking, lift, electricity, facing
        })
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
router.get("/api/alldata", async (req, res) => {
    try {

        const basicscollection = await BasicInfo.find();
        let result = [];
        for (let val of basicscollection) {
            const generalcollection = await generalInfo.find({ basicInfo: val._id });
            const propertycollection = await propertyInfo.find({ basicInfo: val._id })
            const locationcollection = await locationInfo.find({ basicInfo: val._id })
            result.push({
                ...val, ...generalcollection,
                ...propertycollection, ...locationcollection,
            })
        }
        // const result = await basicscollection.map(async (val, idx) => {
        //     const generalcollection = await generalInfo.find({ basicInfo: val._id });
        //     const propertycollection = await propertyInfo.find({ basicInfo: val._id })
        //     const locationcollection = await locationInfo.find({ basicInfo: val._id })
        //     console.log(val);
        //     return {
        //         ...val, ...generalcollection,
        //         ...propertycollection, ...locationcollection,
        //     }

        // })
        // const generalcollection = await generalInfo.find().populate('basicInfo');
        // const locationcollection = await locationInfo.find().populate('basicInfo');
        // const propertycollection = await propertyInfo.find().populate('basicInfo');

        return res.status(200).json({
            message: "success",
            result,

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