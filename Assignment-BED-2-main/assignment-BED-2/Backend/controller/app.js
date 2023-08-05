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

//login
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
            res.sendStatus(500);
        }
    });
});

//registration
app.post("/users/signup", (req,res,next) => {
    user.insert(req.body, (error,userID) =>{
        if (error != null){
            if(error.errno == 1062){
                res.status(422).send("Unprocessable Entity")
                return
             }
        }
        if(error){
            res.status(500).send("Internal Server Error")
            return
        }
        else{
            res.status(201).send({"userid":userID.insertId})
        }
    })
})

//loading games
app.get("/game",(req,res,next) => {
    user.findAll((error, results) => {
        if (error || results == null) {
            res.status(500).send("Internal Server Error")
            return
        }
        res.status(200).send(results)
    })
})

//searching for games
app.get('/game/:search',function(req, res){
    var search = req.params.search;
    parsesearch =  "%"+search+"%"
    user.searchgame(parsesearch, function(err, result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send("Internal Server Error");
        }
    });
})

//getting game details from server
app.get("/game/desc/:priceid",function(req,res){
    const priceid = req.params.priceid;
    user.searchpriceid(priceid, function(err,result){
        if(!err && result.length != 0){
            res.send(result);
        }else{
            res.status(500).send("Internal Server Error");
        }
    })
})

//sending review
app.post("/review",verifyToken,function(req,res){
    user.reviewpost(req.body,req.userid, (error,result) => {
        if(error){
            console.log(error)
            res.status(500).send("Internal Server Error")
            return
        }
        else{
            res.status(201).send({"status":"success"})
        }
    })
})

//getting review based on gameid
app.get("/review/:gid", function(req,res){
    const gameid = req.params.gid
    user.getreview(gameid, function(err,result){
        if(!err){
            res.status(200).send(result)
        }
        else{
            res.status(500).send("Internal Server Error")
        }
    })
})

//getting game based on platform id
app.get("/gameplat/:pid", function(req, res){
    var pid = req.params.pid;
    user.searchgamebypid(pid, function(err, result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send("Internal Server Error");
        }
    });
})

//getting platform names and platformid
app.get("/gameplat", function(req,res){
    user.getallpid(function(err,result){
        if(!err){
            res.status(200).send(result)
        }
        else{
            res.status(500).send("Internal Server Error");
        }
    })
})

//getting game category
app.get("/gamecat", function(req,res){
    user.getcat(function(err,result){
        if(!err){
            res.status(200).send(result)
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    })
})

//uploading game
app.post("/game",  verifyToken,(req,res) => {
    console.log(req.type)
    if (req.type == "admin"){
        user.insertgame(req.body, (error, results) => {
            if(error || results == null){
                res.status(500).send("Internal Server Error")
                return
            }
            else {
                res.status(201).send({"gameid":results.insertId})
            }
    
        })
    }
    else{
        res.status(403).send("Forbidden 403")
    }

})

//uploading new platform
app.post("/platform", verifyToken,(req,res,next) => {
    if (req.type == "admin"){
    user.insertplat(req.body, (error) =>{
        if (error != null){
            if(error.errno == 1062){
                res.status(422).send("Unprocessable Entity")
                return
             }
        }
        if(error){
            console.log(error)
            res.status(500).send("Internal Server Error")
            return
         }
         else {
             res.status(201).send({success: true})
         }
         
    })
    }
    else {
        res.status(403).send("Forbidden 403")
    }
})

module.exports = app