var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var router = require("./router")

var app = express();

//暴露node_modules
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")))
app.use("/static",express.static(path.join(__dirname,"static")))

//配置ejs模板引擎
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


//配置bodyParser  解析post表单请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen("3000", function () {
    console.log("running......");
})