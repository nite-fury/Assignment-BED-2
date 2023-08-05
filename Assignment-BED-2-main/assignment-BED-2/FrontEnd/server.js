// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
const express=require('express');
const path = require('path')
const serveStatic=require('serve-static');

var hostname="localhost";
var port=3001;

var app=express();

app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);

    if(req.method!="GET"){
        res.type('.html');
        var msg="<html><body>This server only serves web pages with GET!</body></html>";
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));
app.get("/",(req,res,next) => {
    const options = {
        root: path.join(__dirname)
    }
    const filename = "/Public/home.html";
    res.sendFile(filename,options, function (err) {
        if (err) {
            next(err);
        }
        else {
            console.log('Sent:', filename)
        }
    })
})

app.use((req, res, next) => {
    const options = {
        root: path.join(__dirname)
    }
    res.status(404).sendFile("/Public/error 404 page.html",options)
  })


app.listen(port,hostname,function(){

    console.log(`Server hosted at http://${hostname}:${port}`);
});