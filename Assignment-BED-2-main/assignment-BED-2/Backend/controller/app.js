// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
const express = require("express")
const app = express()
const user = require("../model/User")
const bodyParser = require("body-parser")
var verifyToken = require('../auth/VerifyToken.js')
var urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json())
app.use(urlencodedParser)
var cors = require('cors');

app.options('*',cors());
app.use(cors());
var urlencodedParser=bodyParser.urlencoded({extended:false})

app.use(bodyParser.json())
app.use(urlencodedParser);

app.post("/users/login", (req,res) => {
    var email=req.body.email;
    var password=req.body.password;

    user.login(email, password, function(err, token, result){
        if(!err){
            res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                delete result[0]['password'];
                console.log(result);
            res.json({success: true, UserData: JSON.stringify(result), token:token, status: 'You are successfully logged in!'});
            res.send();
        } else {
            console.log(err)
            res.status(500);
            res.send(err.statusCode);
        }
    });
});
module.exports = app