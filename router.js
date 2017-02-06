var express = require("express");
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;

var router = express.Router();
var ObjectID = mongo.ObjectID

var url = 'mongodb://localhost:27017/test'

router.get("/", function (req, res) {
    res.render("index");
})

router.get("/students", function (req, res) {
    res.render("students/list");
})

router.get("/students/list", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.json({
                err_no: 500,
                message: "服务器忙，请稍后重试"
            })
        }
        db
            .collection("students")
            .find({})
            .toArray(function (err, docs) {
                if (err) {
                    res.json({
                        err_no: 500,
                        message: "服务器忙，请稍后重试"
                    })
                }
                res.json({
                    err_no: 0,
                    data: docs
                })
            })
        db.close()
    })
})

router.post("/students/add", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.json({
                err_no: 500,
                message: "服务器忙，请稍后重试"
            })
        }
        db
            .collection('students')
            .insertOne(req.body, function (err, result) {
                if (err) {
                    res.json({
                        err_no: 500,
                        message: "服务器忙，请稍后重试"
                    })
                }
                res.json({
                    err_no: 0,
                    message: "success!"
                })
            })
        db.close()
    })
})

router.get("/students/remove", function (req, res) {
    var id = req.query.id;
    MongoClient.connect(url, function (err, db) {
        if(err){
            res.json({
                err_no: 500,
                message: "服务器忙，请稍后再试"
            })
        }
        db
            .collection("students")
            .deleteOne({
                _id : ObjectID(id)
            }, function (err,result) {
                if(err){
                    res.json({
                        err_no: 500,
                        message: "服务器忙，请稍后再试"
                    })
                }
                res.json({
                    err_no: 0,
                    message: "success"
                })
            })
    })
})

module.exports = router;
