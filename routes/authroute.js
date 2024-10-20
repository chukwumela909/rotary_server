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

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: true, message: 'User does not exist' });
        }

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            return res.status(200).json({
                error: false,
                message: generateToken(user._id)
            });
        } else {
            return res.json({ error: true, message: "Invalid login details" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error during login:', error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

router.post("/edit", async (req, res) => {
    try {
        // Assuming you have a User model defined
        const user = await User.findOneAndUpdate({ email: req.body.email }, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.newemail,
            phonenumber: req.body.phonenumber,

        }, { new: true });

        if (!user) {
            return res.json({ error: true, message: "User not found" });
        }

        res.status(200).json({ error: false, user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});


module.exports = router