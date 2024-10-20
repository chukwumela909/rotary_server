const express = require("express")
const router = express.Router()
const User = require('../models/user')
const Plan = require('../models/plans')


router.get("/users", async (req, res, next) => {
    try {
        // You may want to add additional admin authentication/authorization logic here

        const users = await User.find();
        res.status(200).json({ error: false, users });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server errors" });
    }
});




router.post("/create-plan", async (req, res) => {
    try {
        // Assuming you have a User model defined
        const plan = await Plan.create(
            {
                investmentname: req.body.name,
                targetinvestor: req.body.targetinvestor,
                targetcash: req.body.targetcash,
                targetmultiple: req.body.targetmultiple,
                photo: req.body.photo
            }
        )


        res.status(200).json({ error: false, message: plan });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }


});





router.post("/update", async (req, res) => {
    try {
        // Assuming you have a User model defined
        const user = await User.findOneAndUpdate({ email: req.body.email, "investments.name": req.body.investment }, {
            $set: {
                "investments.$.monthlyYield": req.body.monthlyYield,
                "investments.$.investmentSum": req.body.investmentSum,
                "investments.$.profits": req.body.profits,
                "investments.$.withdrawals": req.body.withdrawals
              }
        },
            { new: true }
        );

        if (!user) {
            return res.json({ error: true, message: "User not found" });
        }

        res.status(200).json({ error: false, user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

router.post("/addUserInvest", async (req, res) => {
    try {
        // Assuming you have a User model defined
        const user = await User.findOneAndUpdate({ email: req.body.email }, {
            $push: {
                investments: {
                    name: req.body.investmentName,
                    monthlyYield: req.body.monthlyYield,
                    investmentSum: req.body.investmentSum,
                    profits: req.body.profits,
                    withdrawals: req.body.withdrawals
                }
            }
        },
            { new: true }
        );

        if (!user) {
            return res.json({ error: true, message: "User not found" });
        }

        res.status(200).json({ error: false, user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

router.post("/addUserTransaction", async (req, res) => {
    try {
        // Assuming you have a User model defined
        const user = await User.findOneAndUpdate({ email: req.body.email }, {
            $push: {
                transactions: {
                    message: req.body.message,
                    date: req.body.date
                }
            }
        },
            { new: true }
        );

        if (!user) {
            return res.json({ error: true, message: "User not found" });
        }

        res.status(200).json({ error: false, user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

router.post('/deleteUserTransaction', async (req, res) => {
    const { email, transaction } = req.body; // Assuming you send these as JSON in the body of your DELETE request

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { $pull: { transactions: { message: transaction } } }, // $pull removes from the array any elements that match this condition
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.json({ error:true, message: "User not found or investment name does not exist." });
        }

        res.json({
            message: "Transaction deleted successfully.",
            user: updatedUser
        });
    } catch (error) {
        console.error('Error deleting investment:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/deleteUser', async (req, res) => {
    const { email, investment } = req.body; // Assuming you send these as JSON in the body of your DELETE request

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { $pull: { investments: { name: investment } } }, // $pull removes from the array any elements that match this condition
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.json({ error:true, message: "User not found or investment name does not exist." });
        }

        res.json({
            message: "Investment deleted successfully.",
            user: updatedUser
        });
    } catch (error) {
        console.error('Error deleting investment:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router