var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var userModel = function(){

};

userModel.prototype.model = null;

  // Defining a schema
  var deviceSchema = new mongoose.Schema({
      userName: String,
      contact: { type: Number, index: true },
      email:  String,

  });

  var users = mongoose.model('users', deviceSchema);



userModel.prototype.addUser = function(item,callback){

    users.find({contact : item.contact}, function (err, docs) {
        
        if(err)
          return;

        if (docs.length){
            console.log("contact number already exits");
            return false;
        }  
      var data = new users(item);
       data.save(callback);
   });
        
}



  //code to select all user
  userModel.prototype.get_all_users = function(callBack){

      users.find(function(err, res) {

      if (err)
          console.error(err);

      if(callBack)
          callBack(res);
      });

  }


     //code to delete user
    userModel.prototype.delete_user = function(userId, callback){

        users.remove({ _id: userId } ,function (err ,res){
          if(err){
            console.log(err);
            return;
          }           

        });
        callback();
    }


     //code to get user details
    userModel.prototype.user_details = function(userId, callback){

        users.findOne({ _id: userId } ,function (err, doc){
          if(err){
            console.log(err);
            return;
          }  
          callback(doc); 
      });
    }

    //code to get update user
    userModel.prototype.updateUser = function(userId,item, callback){

        users.update({_id: userId},{$set: item } ,function (err,doc){
          if(err){
            console.log(err);
            return;
          }  
          callback(); 
      });
    }

   
module["exports"] = new userModel();
