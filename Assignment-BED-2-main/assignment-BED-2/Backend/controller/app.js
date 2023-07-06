// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
const express = require("express")
const app = express()
const user = require("../models/User")
const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json())
app.use(urlencodedParser)

app.get("/users/",(req,res,next) => {
    user.findAll((error, results) => {
        if (error || results == null) {
            res.status(500).send("Internal Server Error")
            return
        }
        res.status(200).send(results)
    })
})

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

app.post("/platform", (req,res,next) => {
    user.insertplat(req.body, (error) =>{
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

app.post("/game", (req,res,next) => {
    user.insertgame(req.body, (error, results) =>{
        if(error || results == null){
            res.status(500).send("Internal Server Error")
            return
         }
         else {
             res.status(201).send({"gameid":results.insertId})
         }
    })
})

app.get("/game/:platform", (req,res,next) => {
    const platID = req.params.platform
    if(platID == null || platID == undefined){
        res.status(500).send("Internal Server Error")
        return
    }
    user.FindByplatname(platID, (error,plat) => {
        if (error || plat === null) {
            res.status(500).send("Internal Server Error")
            return
        }
        else{
            res.status(200).send(plat)
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

app.post("/user/:uid/game/:gid/review/", (req,res,next) => {
    const userid = parseInt(req.params.uid)
    const gameid = parseInt(req.params.gid)
    if(isNaN(gameid) || isNaN(userid)) {
        res.status(500).send("Internal Server Error")
        return
    }
    user.postreview(userid,gameid,req.body,(error,results) => {
        if (error || results == null){
            res.status(500).send("Internal Server Error")
            return
        }
        else {
            res.status(201).send({"reiewid":results.insertId})
        }
    })
})

app.get("/game/:id/review", (req,res,next) => {
    const gid = parseInt(req.params.id)
    if(isNaN(gid)) {
        res.status(500).send("Interal Server Error")
        return
    }
    user.getreview(gid,(error,results) => {
        if(error || results == null){
            res.status(500).send("Internal Server Error")
            return
        }
        else {
            res.status(200).send(results)
        }
    })
})
module.exports = app