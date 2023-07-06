// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
var app = require("./controller/app");

var port = 8081;

var server = app.listen(port, function () {
  console.log("Web App hosted http://localhost:%s", port);
});
