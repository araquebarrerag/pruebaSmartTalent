var http = require("http");
var express = require("express");
var port = process.env.PORT || 8080;
var app = express();
var routes = require("./routes/api");
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);
http.createServer(app).listen(port);

console.log("BackEnd corriendo en el puerto: ",port);