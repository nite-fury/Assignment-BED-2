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
              token = jwt.sign({ id: result[0].userid, type: result[0].role}, config.key, {
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
        const insertQuery ="INSERT INTO users (username, email, password) VALUES (?, ?, ?);";
        dbConn.query(insertQuery, [user.username, user.email, user.password], (error, results) => {
          dbConn.end()
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    });
  },
  findAll: function(callback) {
    dbConn = db.getConnection()
    dbConn.connect(function(err){
        if(err){
            return callback(err, null)
        } else{
          const findAllUsersQuery = "SELECT gameprices.priceid,image_url,title,platform.Platform_name,game.description,gameprices.price FROM game JOIN gameprices ON game.gameid = gameprices.gameid JOIN platform ON gameprices.platformid= platform.platformid;"
          dbConn.query(findAllUsersQuery, (error,results) => {
              dbConn.end()
              if (error) {
                  return callback(error, null)
              }
              if (results.length == 0){
                return callback("error", null)
              }
              return callback(null,results)
          });
          }
    });
  },
  searchgame: function (search, callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("***Connected!");
				var sql = `SELECT gameprices.priceid,image_url,title,platform.Platform_name,game.description,gameprices.price FROM game JOIN gameprices ON game.gameid = gameprices.gameid JOIN platform ON gameprices.platformid= platform.platformid WHERE game.title LIKE ?`;


				conn.query(sql, [search], function (err, result) {
					conn.end();
					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});
			}
		});
	},
  searchpriceid: function (search, callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("***Connected!");
				var sql = ` SELECT game.gameid,game.image_url, category.catname,game.description, game.title, game.year FROM game JOIN gameprices ON game.gameid = gameprices.gameid JOIN platform ON gameprices.platformid= platform.platformid JOIN gamecategory ON game.gameid = gamecategory.gameid JOIN category ON gamecategory.catid = category.catid WHERE gameprices.priceid = ?`;
				conn.query(sql, [search], function (err, result) {
					conn.end();
					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});
			}
		});
  },
  reviewpost: function (user, tokenuid, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection got issue!

        return callback(err, null);
      } else {
        profile_pic_url="placeholder.jpg"
        type = "customer"
        const insertQuery ="INSERT INTO review (gameid, userid, content, rating) VALUES (?, ?, ?, ?);";
        dbConn.query(insertQuery, [user.gameid, tokenuid, user.content, user.rating], (error, results) => {
          dbConn.end()
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    });
  },
  getreview: function (search, callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("***Connected!");
				var sql = ` SELECT username,content,rating,review.created_at from review JOIN users ON review.userid = users.userid where gameid = ?`;
				conn.query(sql, [search], function (err, result) {
					conn.end();
					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});
			}
		});
  },
  searchgamebypid: function (search, callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("***Connected!");
				var sql = `SELECT gameprices.priceid,image_url,title,platform.Platform_name,game.description,gameprices.price FROM game JOIN gameprices ON game.gameid = gameprices.gameid JOIN platform ON gameprices.platformid= platform.platformid WHERE gameprices.platformid = ?`;


				conn.query(sql, [search], function (err, result) {
					conn.end();
					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});
			}
		});
	},
  getallpid: function(callback) {
    dbConn = db.getConnection()
    dbConn.connect(function(err){
        if(err){
            return callback(err, null)
        } else{
          const findAllUsersQuery = "SELECT platform_name,platformid FROM platform;"
          dbConn.query(findAllUsersQuery, (error,results) => {
              dbConn.end()
              if (error) {
                  return callback(error, null)
              }
              if (results.length == 0){
                return callback("error", null)
              }
              return callback(null,results)
          });
          }
    });
  },
  getcat: function(callback) {
    dbConn = db.getConnection()
    dbConn.connect(function(err){
        if(err){
            return callback(err, null)
        } else{
          const findAllUsersQuery = "SELECT catname,catid FROM category;"
          dbConn.query(findAllUsersQuery, (error,results) => {
              dbConn.end()
              if (error) {
                  return callback(error, null)
              }
              if (results.length == 0){
                return callback("error", null)
              }
              return callback(null,results)
          });
          }
    });
  },
  insertgame: function (game,img_name, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {//database connection got issue!
        return callback(err, null);
      } 
      else {
         price = game.price
         platformid = game.platformid
         categoryid = game.categoryid
         splitcat = categoryid.split(",")
         splitprice = price.split(",")
         splitplatform = platformid.split(",")    
         if (splitprice.length == splitplatform.length){
          console.log("price length check PASS")
          platformidsql = [] 
          correctplat = []
          wrongplat = []
          catidsql = []
          wrongcatid = []
          correctcatid = []
          const checkplatform = "SELECT platformid FROM platform;"
          dbConn.query(checkplatform, (error, result) => {
            if (error || result == null || result.length == 0) {
              console.log("platform check FAIL")
              return callback(null, null);
            }
            else {
              platformidsql.push(result)
            }
            console.log(platformidsql)
            console.log(splitplatform)
            if (platformidsql[0].length >= splitplatform.length){
              console.log("platform check PASS")
          for (i = 0; i < platformidsql[0].length; i++){
            for (a = 0;a < splitplatform.length; a++){
            if (splitplatform[a] == platformidsql[0][i].platformid){
              correctplat.push(splitplatform[a])
            }
            else {
              wrongplat.push(splitplatform[a])
            }
          }
        }
      }
      else {
        console.log("platform check FAIL")
        return callback(null, null)
      }
        const checkcategory = "SELECT catid FROM category;"
        dbConn.query(checkcategory, (error, catresult) => {
          console.log(catresult)
          if (error || catresult == null || catresult.length == 0){
            console.log(error)
            console.log(catresult)
            console.log("category check FAIL 1")
            return callback(null, null);
          }
          else {
            catidsql.push(catresult)
          }
          if (catidsql[0].length >= splitcat.length){
            console.log("category check PASS")
          for (i = 0; i < catidsql[0].length; i++){
            for (a = 0;a < splitcat.length; a++){
            if (splitcat[a] == catidsql[0][i].catid){
              correctcatid.push(splitcat[a])
            }
            else {
              wrongcatid.push(splitcat[a])
            }
          }
        }
      }
      else {
        console.log("category check FAIL")
        return callback(null, null)
      }
        if (correctplat.length == splitplatform.length && correctcatid.length == splitcat.length){
          console.log("Game insert PASS")
         const gameisertquery = "INSERT INTO game (title, description, year, image_url) VALUES (?, ?, ?, ?);";
         dbConn.query(gameisertquery, [game.title, game.description, game.year, img_name], (error, gameresults) => {
          if (error) {
            console.log(error)
            return callback(error, null);
          }
          gameres = gameresults.insertId
        for (i = 0; i < splitprice.length; i++) {
            console.log("Price insert PASS")
        const insertQuery ="INSERT INTO gameprices (gameid, price, platformid) VALUES (?, ?, ?);";
        dbConn.query(insertQuery, [gameres, splitprice[i], splitplatform[i]], (error, results) => {
          if (error) {
            console.log(error)
            return callback(error, null)
          }
        });
       }
       for(catids = 0; catids < splitcat.length; catids++){
        console.log("insert into price PASS")
        const inserttogamecat = "INSERT INTO gamecategory (gameid, catid) VALUES (?, ?);";
        dbConn.query(inserttogamecat, [gameres, splitcat[catids]], (error, results) => {
          if (error){
            return callback(error, null);
          }
          console.log("Inserted into new category")
        });
       }
       dbConn.end()  
       return callback(null, gameresults);          
      });
      }
      else{
        console.log("platid and catid length check FAIL")
        return callback(null, null)
      }
    });
    }); 
    }
    else {
      console.log("length check fail")
      return callback(null, null)
    }
  }
  });
  }
}
module.exports = User;
