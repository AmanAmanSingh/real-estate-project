const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const usermodel = require("../models/user-model.js")
const cors = require("cors")
const jwt = require("jsonwebtoken")
//const secret = "RESTAPI"
//const validator = require('validator');

dotenv.config()
router.use(cors())
router.get('/', async (req, res) => {
  try {
    const data = await usermodel.find();
    res.status(200).json({
      status: "success",
      data
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
})
router.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body;
    if (!email || !password || !confirmpassword) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are mandatory",
      });
    }
    const present = await usermodel.findOne({ email });
    if (present) {
      return res.status(400).json({
        status: "failed",
        message: "User already registered",
      });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({
        status: "failed",
        message: "Passwords do not match",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usermodel.create({
      email:req.body.email,
      password: hashedPassword,
    });
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "failed",
      message: "Registration failed",
    });
  }
});



router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email && password) {
      res.status(400).json({
        status: "failed",
        message: "All fields required"
      })
    }
    const data = await usermodel.findOne({ email })
    if (!data) {
      res.status(400).json({
        status: "failed",
        message: "user not registered"
      })
    }/*
    bcrypt.compare(password, data.password, function (err, result) {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: err.message
        })
      }
      if (result) {
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: user_id
        }, process.env.TOKEN_KEY);
        res.status(200).json({
          status: "success",
          message: "Login Succesfull",
          token
        })
      } else {
        res.status(400).json({
          status: "failed",
          message: "not a valid password"
        })
      }
    })
  }*/ }catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
})
module.exports = router