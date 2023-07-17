// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
const { query } = require("express");
const db = require("./databaseConfig");
const dbconnect = require("./databaseConfig");
var jwt =require('jsonwebtoken')
var config = require('../config.js')

const User = {
  login: function(email, password, callback){
    var dbConn = db.getConnection();
    dbConn.connect(function (err){
      if (err) {
        return callback(err,null);
      }
      else {
        const checklogin = "SELECT * from users where email=? and password=?";

        dbConn.query(checklogin, [email,password], function (err, result){
          dbConn.end();

          if (err){
            return callback(err, null, null);
          } else {
            var token = "";
            var i;
            if (result.length == 1){
              token = jwt.sign({ id: result[0].username, type: result[0].role}, config.key, {
                expiresIn: 86400
              });
              return callback(null, token, result);
            } else {
              var err2 = new Error("UserID/Password does not match.")
              err2.statusCode = 500;
              return callback(err2, null, null)
            }
          }
        })
      }
    })
  },
   //function to insert new user
   insert: function (user, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection got issue!

        return callback(err, null);
      } else {
        profile_pic_url="placeholder.jpg"
        type = "customer"
        const insertQuery ="INSERT INTO users (username, email, password, type, profile_pic_url) VALUES (?, ?, ?, ?, ?);";
        dbConn.query(insertQuery, [user.username, user.email, user.password, type, profile_pic_url], (error, results) => {
          dbConn.end()
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    });
  }
}
module.exports = User;
