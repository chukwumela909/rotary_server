const express = require("express")
const Baby = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer');

const { generateToken } = require("../controllers/userController");

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail, Outlook, etc. Use 'smtp.mailtrap.io' for testing with Mailtrap
    auth: {
        user: 'amweb.ng@gmail.com', // Your email address
        pass: 'Golda909%', // Your email password (use an app password for Gmail)
    },
});



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


router.post("/send-mail", async (req, res, next) => {
    try {
        const { to, subject, text } = req.body;

        // Email options
        const mailOptions = {
            from: 'amweb.ng@gmail.com', // Sender's email
            to, // Recipient's email
            subject, // Email subject
            text, // Email body
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.json({ error: true, message: error })
            }
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        });

    } catch (error) {
        return res.json({ error: true, message: error })
    }
})







module.exports = router