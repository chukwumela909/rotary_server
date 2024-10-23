const express = require("express")
const Baby = require('../models/user')
const Vote = require('../models/votes')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer');

const { generateToken } = require("../controllers/userController");

// const transporter = nodemailer.createTransport({
//     service: 'gmail', // e.g., Gmail, Outlook, etc. Use 'smtp.mailtrap.io' for testing with Mailtrap
//     auth: {
//         user: 'amirizew@gmail.com', // Your email address
//         pass: 'guokgbgumyaafcoe', // Your email password (use an app password for Gmail)
//     },
// });



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
        return res.json({ error: true, message: error })
    }
})

router.post("/get-baby", async (req, res, next) => {
    try {
        const baby = await Baby.findOne({ _id: req.body.id });
        if (!baby) return res.json({ error: true, message: "Baby not found" });
        return res.status(200).json({ error: false, message: baby });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
})

router.put("/update-baby/:id", async (req, res, next) => {
    try {
        const baby = await Baby.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            votes: req.body.vote
        }, { new: true });
        if (!baby) return res.json({ error: true, message: "Baby not found" });
        return res.status(200).json({ error: false, message: baby });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
})

router.get("/babies", async (req, res, next) => {
    try {
        // const babyExists = await Baby.findOne({ phoneNumber: req.body.phoneNumber })
        // if (babyExists) return res.json({ error: true, message: "Baby already registered" })

        const babies = await Baby.find()
        return res.status(200).json({ error: false, message: babies })


    } catch (error) {
        return res.json({ error: true, message: error })
    }
})


router.post("/send-vote", async (req, res, next) => {
    try {
        const { name, email, amount, baby_id, receipt_img, vote_number} = req.body;
        console.log({name, email, amount, baby_id, receipt_img, vote_number})

        const baby = await Baby.findOne({ _id: baby_id });

        const thevote = await Vote.create(
            {
                voterName: name,
                voterEmail: email,
                amount: amount,
                receipt: receipt_img,
                vote: vote_number,
                babyName: baby.name,
                motherName: baby.motherName,
                babyphoto:  baby.babyPicture,
            }
        )
        return res.status(200).json({ error: false, message: thevote })


    } catch (error) {
        return res.json({ error: true, message: "the"+error })
    }
})

router.get("/votes", async (req, res, next) => {
    try {
        // const babyExists = await Baby.findOne({ phoneNumber: req.body.phoneNumber })
        // if (babyExists) return res.json({ error: true, message: "Baby already registered" })

        const votes = await Vote.find()
        return res.status(200).json({ error: false, message: votes })


    } catch (error) {
        return res.json({ error: true, message: error })
    }
})





module.exports = router