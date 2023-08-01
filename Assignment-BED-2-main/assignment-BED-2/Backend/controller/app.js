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
const upload = require('../upload/multer')
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
            res.sendStatus(500);
            res.send(err.statusCode);
        }
    });
});

app.post("/users/", (req,res,next) => {
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

app.get("/game",(req,res,next) => {
    user.findAll((error, results) => {
        if (error || results == null) {
            res.status(500).send("Internal Server Error")
            return
        }
        res.status(200).send(results)
    })
})

app.get('/game/:search',function(req, res){
    var search = req.params.search;
    parsesearch =  "%"+search+"%"
    user.searchgame(parsesearch, function(err, result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    });
})

app.get("/game/desc/:priceid",function(req,res){
    const priceid = req.params.priceid;
    user.searchpriceid(priceid, function(err,result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    })
})

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

app.post("/user/:uid/game/:gid/review/", verifyToken,(req,res,next) => {
    const userid = parseInt(req.params.uid)
    const gameid = parseInt(req.params.gid)
    if(isNaN(gameid) || isNaN(userid)) {
        res.status(500).send("Internal Server Error")
        return
    }
    user.postreview(req.userid,gameid,req.body,(error,results) => {
        if (error || results == null){
            res.status(500).send("Internal Server Error")
            return
        }
        else {
            res.status(201).send({"reiewid":results.insertId})
        }
    })
})

// app.get("/game/:id/review", (req,res,next) => {
//     const gid = parseInt(req.params.id)
//     if(isNaN(gid)) {
//         res.status(500).send("Interal Server Error")
//         return
//     }
//     user.getreview(gid,(error,results) => {
//         if(error || results == null){
//             res.status(500).send("Internal Server Error")
//             return
//         }
//         else {
//             res.status(200).send(results)
//         }
//     })
// })

app.get("/user/review/:gid", function(req,res){
    const gameid = req.params.gid
    user.getreview(gameid, function(err,result){
        if(!err){
            res.status(201).send(result)
        }
        else{
            res.status(500).send("Some error")
        }
    })
})

app.get("/gameplat/:platform", function(req, res){
    var pid = req.params.platform;
    user.searchgamebypid(pid, function(err, result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    });
})

// app.get("/game/:platform", (req,res) => {
//     const platID = req.params.platform
//     if(platID == null || platID == undefined){
//         res.status(500).send("Internal Server Error")
//         return
//     }
//     user.FindByplatname(platID, (error,plat) => {
//         if (error || plat === null) {
//             res.status(500).send("Internal Server Error")
//             return
//         }
//         else{
//             res.status(200).send(plat)
//         }
//     })
// })

app.get("/gameplat", function(req,res){
    user.getallpid(function(err,result){
        if(!err){
            res.status(200).send(result)
        }
        else{
            res.status(500).send("Some error");
        }
    })
})

app.get("/gamecat", function(req,res){
    user.getcat(function(err,result){
        if(!err){
            res.status(200).send(result)
        }
        else {
            res.status(500).send("Some error");
        }
    })
})

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

app.get("/users/",(req,res,next) => {
    user.findAll((error, results) => {
        if (error || results == null) {
            res.status(500).send("Internal Server Error")
            return
        }
        res.status(200).send(results)
    })
})

app.get("/users/:id/", (req,res,next) => {
    const userID = parseInt(req.params.id)
    if(isNaN(userID)){
        res.status(500).send("Internal Server Error")
        return
    }
    user.FindByID(userID, (error,user) => {
        if (error || user === null) {
            res.status(500).send("Internal Server Error")
            return
        }
        else{
            res.status(200).send(user)
        }
    })
})
app.post("/category", (req,res,next) => {
    user.insertcat(req.body, (error) =>{
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
        else {
            res.status(201).send()
        }
    })
})

app.delete("/game/:id", (req,res,next) => {
    const gameID = parseInt(req.params.id)
    if(isNaN(gameID)){
        res.status(500).send("Internal Server Error")
        return
    }
    user.delgame(gameID,(error) => {
        if (error){
            res.status(500).send("Internal Server Error")
            return
        }
        else{
            res.status(204).send()
        }
    })
})

app.put("/game/:id", (req,res,next) => {
    const gameID = parseInt(req.params.id)
    if(isNaN(gameID)){
        res.status(500).send("Internal Server Error")
        return
    }
    user.editgame(gameID,req.body,(error,results) => {
        if (error || results == null){
            res.status(500).send("Internal Server Error")
            return
        }
        else{
            res.status(204).send()
        }
    })
})

module.exports = app