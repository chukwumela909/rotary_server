const express = require("express")
const Baby = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const { generateToken } = require("../controllers/userController");



const router = express.Router()



router.post("/register", async (req, res, next) => {
    try {
        // const babyExists = await Baby.findOne({ phoneNumber: req.body.phoneNumber })
        // if (babyExists) return res.json({ error: true, message: "Baby already registered" })

        const baby = await Baby.create(
            {
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                motherName: req.body.motherName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                babyPicture: req.body.babyPicture,
                immunizationCard: req.body.immunizationCard
            }
        )
        return res.status(200).json({ error: false, message: baby })

    } catch (error) {
        return res.json({ error: true, message: error})
    }
})




module.exports = router