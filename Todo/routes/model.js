var express = require('express');
var mongoose  = require('mongoose');
var connect = mongoose.connect('mongodb://localhost/todos');
var db = mongoose.connection;
var moment = require('moment');
var now = moment(new Date());
//var dates = now.format("D MMM YYYY");
//var time = now.format("H MMM SSSS");
var dates=now.format('MMMM Do YYYY, h:mm:ss a');
var fdate = now.format('DD-MM-YYYY');

var todoSchema = mongoose.Schema({
    username:{type:String},
    todo:{type:String},
    isDone:{type:Boolean},
    date:{type:String,default:dates},
    fdate:{type:String,default:fdate},
    edate:{type:String}
});

var Todo =mongoose.model('Todo',todoSchema);
module.exports = Todo; 
