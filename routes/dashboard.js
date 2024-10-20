const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Plan = require('../models/plans')
const { protect } = require('../middlewares/authmiddleware')


router.post("/dashboard", protect, async (req, res, next) => {
    const requser = req.user;
    const user = await User.find({ _id: requser });
    const plans = await Plan.find();
    return res.status(200).json({ message: "Dashboard accessed successfully", user, plans });
})



router.post('/updateDeviceData',  async (req, res, next) => {
    const { browser, operatingSystem, userDevice, userLocation, email } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email: email }, {
            browser: browser,
            operatingSystem: operatingSystem,
            userDevice: userDevice,
            userLocation: userLocation
        },{ new: true });

        if (!user) {
            return res.json({ error: true, message: "User is not found" });
        }

        res.status(200).json({ error: false, user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }




})

module.exports = router
