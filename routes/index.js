var express = require('express');
var router = express.Router();
var multer  = require('multer');

var users = require('../models/userModel');
var picture = require('../models/pictureModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});


router.post('/insert', function(req, res, next) {
  var item = {
    userName: req.body.name,
    email: req.body.email,
    contact: req.body.contact
  };
  users.addUser(item ,function(callback) {
      console.log("insert done");
      res.redirect('/get_users');

  });

});


//function to get all users from user table
router.get('/get_users', function(req,res){
  users.get_all_users(function(callback) {
    res.render('userTable', {items: callback});
  });
});


//function to delete user
router.get('/delete_user/:userId/', function(req,res){

  var userId = req.params.userId;
  console.log(userId);

  users.delete_user(userId ,function(callback) {
      res.redirect('/get_users');
    });
});

//function to get user details
router.get('/edit_user/:userId/', function(req,res){

  var userId = req.params.userId;
   users.user_details(userId, function(doc) {

    res.render('updateUser', doc);
  });

});


router.post('/update', function(req, res, next) {
  var item = {
    userName: req.body.name,
    email: req.body.email,
    contact: req.body.contact
  };
  var id = req.body.id;

  users.updateUser(id, item ,function(callback) {
      console.log("update done");
      res.redirect('/get_users');

  });

});


  /* GET home page. */
  router.get('/gallery/:id', function(req, res, next) {

     var userId = req.params.id;
       picture.gallery_details(userId, function(doc) {
         if(doc == null){
           res.render('picture_upload',{"id" : userId , item : null});
         }
         else{
           res.render('picture_upload',{"id" : userId , item : doc.file});
         }

        //res.render('picture_upload',{"id" : userId }, {items: doc.file});
      });
  });

    /* GET home page. */
  router.get('/gallery_details/:id', function(req, res, next) {

     var userId = req.params.id;
       picture.gallery_details(userId, function(doc) {

        res.json(doc);

        //res.render('picture_upload',{"id" : userId }, doc);
      });
  });



 router.post("/pictureUpload", function(req, res) {


   var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
          var filename  = file.fieldname + "_" + Date.now() + "_" + file.originalname;


         callback(null, filename);
     }
   });


  var upload = multer({ storage : Storage }).array('userPhoto',10);

     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
           files = [];

           var fileObj =  {
                name: req.files[0].filename,
                data: req.body.name,
                mimetype: req.files[0].mimetype ,
                size : req.files[0].size,
            };

            files.push(fileObj);
            var item = {
              userId: req.body.id,
              file : files
            };

        picture.addPicture(item ,function(callback) {
            console.log("insert done");


        });


         /*return res.end("File uploaded sucessfully!.");*/
     });
 });

 //function to get all users from user table
 router.get('/get_pics', function(req,res){
   picture.get_all_picture(function(callback) {
    res.json(callback);
   });
 });



module.exports = router;
