const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 1200
const mongoose = require('mongoose');
const bodyParser = require('body-parser');




// const uri = 'mongodb+srv://amirizew:dodo1111@cluster0.nib2hkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const uri = 'mongodb+srv://wisdom:Golda909@cluster0.tqakn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const uri = 'mongodb+srv://amirizew:gold123909@cluster0.nib2hkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//database  connection
// mongoose.connect(uri,).then(
//     () => {console.log('connected successfully')}
//   );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Routes
const adminRoute = require("./routes/adminroute")
const authenticationRoute = require("./routes/authroute")
const dashboardRoute = require("./routes/dashboard")



//MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // req.header("Content-Type: application/x-www-form-urlencoded");
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", " GET, POST, OPTIONS, PUT, PATCH, DELETE")
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
})

// Customer ID
const customerKey = "2520ba00b558426fac1bbf5032127f2e"
// Customer secret
const customerSecret = "57da2047debb4c51a723f5f0a82d55cc"
// Concatenate customer key and customer secret and use base64 to encode the concatenated string
const plainCredential = customerKey + ":" + customerSecret
// Encode with base64
encodedCredential = Buffer.from(plainCredential).toString('base64')


console.log(encodedCredential)




app.use('/admin', adminRoute)
app.use('/auth', authenticationRoute)
app.use('/', dashboardRoute)
// app.use('/', dashboardRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})