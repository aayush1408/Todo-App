var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = require('./model.js');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  
   Todo.find({}).exec(function(err,result){
            if(err) throw err;
            else{
                console.log(result);
                res.render('index',{result:result});
            }
        });

});

//Adding the task and name in database
router.post('/addtask',function(req,res,next){
  var username  = req.body.username;
  var todo = req.body.todo;
  var edate = req.body.edate;

 
  var newTodo = new Todo({
    username:username,
    todo:todo,
    isDone:false,
    edate:(moment(edate).format("DD-MM-YYYY"))
  });
  newTodo.save(function(err){
    if(err) throw err;
    else{
        console.log('Saved in database');
        res.redirect('/');
        //Reading from database
        Todo.find({}).exec(function(err,result){
            if(err) throw err;
            else{
                console.log(result);
                console.log('Hellooo');
                res.render('index',{result:result});
            }
        });
        //Reading done
    }
  });//Adding Done

//Edit page
router.get('/edit/:id', function(req, res, next) {
  
   Todo.find({_id:req.params.id}).exec(function(err,result){
            if(err) throw err;
            else{
                console.log(result);
                res.render('edit',{result:result});
            }
        });

});//End of edit route
//Edit the tasks
router.post('/edittask/:id',function(req,res,next){
    console.log('In the route');
    Todo.findOneAndUpdate({_id:req.params.id},
                          {$set:{username:req.body.username,todo:req.body.todo,isDone:req.body.status,edate:req.body.edate}},
                          {upsert:true},
                          function(err,doc){
                            if (err){
                                console.log('Error');
                            } 
                            else{
                                console.log(doc);
                                res.redirect('/');
                            }
                          });
});//Edited route ends here

//Delete the completed tasks
router.get('/delete/:id',function(req,res,next){
    Todo.findOneAndRemove({_id:req.params.id},function(err,done){
        if (err) {
            console.log(err);
        }
        else{
            console.log(done);
            res.redirect('/');
        }
    });
});//Delete route ends here

});//route ends for home page
module.exports = router;
