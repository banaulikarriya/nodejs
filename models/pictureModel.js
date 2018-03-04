var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var pictureModel = function(){

};

pictureModel.prototype.model = null;

  // Defining a schema
  var pictureSchema = new mongoose.Schema({
      userId: { type: String, index: true },
      data : String,
      image: String,
        file: []

  });

  var picture = mongoose.model('picture', pictureSchema);


  pictureModel.prototype.addPicture = function(item,callback){

  console.log("going to insert");
  picture.find({userId : item.userId}, function (err, docs) {
        
        if(err)
          return;

        if (docs.length){
           
            picture.update(
              { userId: item.userId }, 
              { $push: item.file }
             
            );       
           } 
       
        var data = new picture(item);
        data.save(callback);
      });
  
        
}

     //code to get user details
    pictureModel.prototype.gallery_details = function(userId, callback){

        picture.findOne({ userId: userId } ,function (err, doc){
          if(err){
            console.log(err);
            return;
          }  
          return callback(doc); 
      });
    }

module["exports"] = new pictureModel();
