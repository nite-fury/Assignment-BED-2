// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
const mysql = require("mysql");

var dbconnect = {
    getConnection: function () {
  
      var conn = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '9CPa#2nZ9^q299k*dEPe', //your own password
        database: 'ca1',
        dateStrings: true
      });
  
      return conn;
    }
  };
  
  // put this at the end of the file
  module.exports = dbconnect;
  