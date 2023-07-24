var jwt = require('jsonwebtoken');

var config = require('../config');

function verifyToken(req, res, next){

    var token = req.headers['authorization']; //retrieve authorization header's content

    if(!token || !token.includes('Bearer')){ //process the token
    
       res.status(403);
       console.log("process issue")
       return res.send({auth:'false', message:'Not authorized!'});
    }else{
       token=token.split('Bearer ')[1]; //obtain the token's value
    //console.log(token);
       jwt.verify(token, config.key, function(err, decoded){ //verify token
        if(err){
            console.log("token issue")
            res.status(403);
            return res.end({auth:false, message:'Not authorized!'});
        }else{
            req.userid=decoded.id; //decode the userid and store in req for use
            req.type = decoded.type; //decode the role and store in req for use
            next();
        }
       });
    }
}

module.exports = verifyToken;