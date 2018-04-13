var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var pictureModel = function(){

};

pictureModel.prototype.model = null;

  // Defining a schema
  var pictureSchema = new mongoose.Schema({
      userId : { type: String, index: true },
      file   : []

  });

  var picture = mongoose.model('pictures', pictureSchema);


  pictureModel.prototype.addPicture = function(item,callback){

      picture.find({userId : item.userId}, function (err, docs) {

        if (docs.length){

          picture.update(
           { userId: item.userId},
           {"$push": { "file": item.file[0] } }
         ).exec(function (err, result) {
            if(err){
              console.log(err);
              return;
            }
            else{
              console.log("update success");
              return callback(result);
            }
          });
          }

      });
    var data = new picture(item);
    data.save( function (err, docs) {
      if(err){
        console.log(err)
      }else {
        callback(docs);
      }
    });

  }


  //
  //       if(err)
  //         return;
  //
  //       if (docs.length){
  //
  //           picture.update(
  //             { userId: item.userId },
  //             { $push: item.file }
  //
  //           );
  //          }
  //
  //       var data = new picture(item);
  //       data.save(callback);
  //     });




     //code to get user details
    pictureModel.prototype.gallery_details = function(userId, callback){

        picture.findOne({ userId: userId } ,function (err, doc){
          if(err){
            console.log(err);
            return;
          }
          console.log(doc);
          if (doc != null){
            return callback(doc);
          }
          else {
            return callback(null);
          }
      });
    }

    //code to select all picture
    pictureModel.prototype.get_all_picture = function(callBack){

        picture.find(function(err, res) {

        if (err)
            console.error(err);

        console.log(res);
        if(callBack)
            callBack(res);
        });

    }

module["exports"] = new pictureModel();
