// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
const { query } = require("express");
const db = require("./databaseConfig");
const dbconnect = require("./databaseConfig");

const User = {
  //function to find all users
  findAll: function(callback) {
    dbConn = db.getConnection()
    dbConn.connect(function(err){
        if(err){
            return callback(err, null)
        } else{
          const findAllUsersQuery = "SELECT * FROM users;"
          dbConn.query(findAllUsersQuery, (error,results) => {
              dbConn.end()
              if (error) {
                  return callback(error, null)
              }
              if (results.length == 0){
                return callback(null, null)
              }
              return callback(null,results)
          });
          }
    });
  },
  //function to insert new user
  insert: function (user, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection got issue!

        return callback(err, null);
      } else {
        const insertQuery ="INSERT INTO users (username, email, password, type, profile_pic_url) VALUES (?, ?, ?, ?, ?);";
        dbConn.query(insertQuery, [user.username, user.email, user.password, user.type, user.profile_pic_url], (error, results) => {
          dbConn.end()
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    });
  },
  //find user by id
  FindByID: function(UserID, callback) {
    dbConn = db.getConnection()
    dbConn.connect(function(err){
        if (err){
            return callback(err, null)
        }
        else {
            const FindUserByIDQuery = "SELECT * FROM users WHERE userid = ?;"
            
            dbConn.query(FindUserByIDQuery, [UserID], (error, results) => {
                dbConn.end()

                if (results.length == 0){
                    callback(null, null)
                    return
                }
                if (error) {
                    return  callback(error,results)
                }
                return callback(null, results[0])
            })
        }
    })
  },
  //inserting of category
  insertcat: function (cat, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection got issue!

        return callback(err, null);
      } else {
        const insertQuery ="INSERT INTO category (catname, description) VALUES (?, ?);";
        dbConn.query(insertQuery, [cat.catname, cat.description], (error, results) => {
          dbConn.end()
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    });
  },
  //inserting of platform
  insertplat: function (plat, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection got issue!
        return callback(err, null);
      } else {
        const insertQuery ="INSERT INTO platform (platform_name, description) VALUES (?, ?);";
        dbConn.query(insertQuery, [plat.platform_name, plat.description], (error, results) => {
          dbConn.end()
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    });
  },
  //inserting of game
  insertgame: function (game, callback) {
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
         const gameisertquery = "INSERT INTO game (title, description, price, platformid, categoryid, year) VALUES (?, ?, ?, ?, ?, ?);";
         dbConn.query(gameisertquery, [game.title, game.description, game.price, game.platformid, game.categoryid, game.year], (error, gameresults) => {
          if (error) {
            console.log(error)
            return callback(error, null);
          }
          gameres = gameresults.insertId
        for (i = 0; i < splitprice.length; i++) {
            console.log("Price insert PASS")
        const insertQuery ="INSERT INTO price (gameid, price, platform ) VALUES (?, ?, ?);";
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
  },
  //finding platform name
  FindByplatname: function(platname, callback) {
    dbConn = db.getConnection()
    dbConn.connect(function(err){
        if (err){
            return callback(err, null)
        }
        else {
            const FindUserByIDQuery = "SELECT DISTINCT game.gameid,game.title,game.description,price.price,platform.platform_name,game.categoryid,category.catname,game.year,game.created_at FROM game JOIN price ON game.gameid = price.gameid JOIN gamecategory ON game.categoryid = gamecategory.catid JOIN category on game.categoryid = category.catid JOIN platform on platform.platformid = price.platform where platform_name =?;"
            dbConn.query(FindUserByIDQuery, [platname], (error, results) => {
                if (results == undefined || results.length ==0){
                  return callback(null,null)
                }
                if (error) {
                  return  callback(error,results)
                }
                dbConn.end()
                return callback(null, results)
            })
        }
    })
  },
//deleting of game
  delgame: function(gameID, callback) {
    dbConn = db.getConnection()
    dbConn.connect(function(err){
        if (err){
            return callback(err, null)
        }
        else{
          const delqery= "DELETE FROM game where gameid = ?;"

          dbConn.query(delqery, [gameID], (error, results) => {
            dbConn.end()

            if (error) {
              return callback(error, null)
            }
            return callback(null,results)
          })
        }
    })
  },
//editing of game
  editgame: function(gameID,edited, callback) {
    dbConn = db.getConnection()
    dbConn.connect(function(err){
        if (err){
            return callback(err, null)
        }
        else{
          price = edited.price
          platform = edited.platformid
          category = edited.categoryid
          splitcat = category.split(",")
          splitprice = price.split(",")
          splitplatform = platform.split(",")
          if (splitprice.length == splitplatform.length){
            platformidsql = []
            correctplat = []
            wrongplat = []
            catidsql = []
            wrongcatid = []
            correctcatid = []
            const checkplatform = "SELECT platformid FROM platform;"
            dbConn.query(checkplatform, (error, result) => {
              if (error || result == null || result.length == 0) {
                console.log(error)
                return callback(null, null);
              }
              else {
                platformidsql.push(result)
              }
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
          const checkcategory = "SELECT catid FROM category;"
          dbConn.query(checkcategory, (error, catresult) => {
            if (error || catresult == null || catresult.length == 0){
              console.log("fail cat length")
              return callback(null, null);
            }
            else {
              catidsql.push(catresult)
            }
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
          console.log("finalplatformid--------------------")
        console.log({"correct":correctplat})
        console.log({"wrong":wrongplat})
        console.log({"Checked platformid":platformidsql[0]})
        console.log("finalcatid-------------------------")
        console.log({"Correct catid":correctcatid})
        console.log({"wrong catid":wrongcatid})
        console.log({"checked catid":catidsql[0]})
        if (correctplat.length == splitplatform.length && correctcatid == splitcat.length && splitprice.length == splitplatform.length){
          const updategamequery= "UPDATE game SET title = ?, description = ?, price = ?, categoryid = ?, year = ?,platformid =? where gameid = ?;"
          dbConn.query(updategamequery, [edited.title,edited.description,edited.price,edited.categoryid,edited.year,edited.platformid,gameID], (error, results) => {
            if (error || results.affectedRows == 0) {
              return callback(error, null)
            }
              for (let i = 0; i < splitprice.length; i++){
                const updatepricequery = "UPDATE price SET price = ? where gameid = ? AND platform = ?;"
                dbConn.query(updatepricequery, [splitprice[i],gameID,splitplatform[i]], (error) => {
                  if (error) {
                    return callback(error, null)
                  }
                }); 
              }
            dbConn.end()
            return callback(null, results)
          });
        }
        else{
          console.log("fail price check")
          return callback(null, null)
        }
          })
        })
          }
        }
    })
  },
  //post review
  postreview: function(userid,gameid,review,callback){
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      if (err) {//database connection got issue!

        return callback(err, null);
      } else {
        const findusername ="SELECT username FROM users WHERE userid = ?;"
        dbConn.query(findusername,[userid], (error, username) => {
          if (error) {
            return callback(error, null)
          }
          if (username.length == 0){
            callback(error, null)
            return
          }
           const insertQuery ="INSERT INTO review (gameid, userid, content, rating, username) VALUES (?, ?, ?, ?, ?);";
          dbConn.query(insertQuery, [ gameid, userid, review.content, review.rating,username[0].username], (error, createresults) => {
            if (error || createresults.length == 0) {
              return callback(error, null);
            }
            dbConn.end()
            return callback(null, createresults);
          });
        });
      }
    });
  },
  //get review
  getreview: function(gid, callback){
    var dbConn = db.getConnection();
    dbConn.connect(function (err){
      if (err) {
        return callback (err,null);
      }
      else {
        const getreview = "SELECT gameid,content,rating,username,created_at FROM review WHERE gameid = ?;"
        dbConn.query(getreview, [gid], (error, getresults) => {
          if (error || getresults.length == 0){
            return callback(error, null);
          }
          dbConn.end()
          return callback(null, getresults);
        })
      }
    })
  }
}
module.exports = User;
