var mongoose = require('mongoose');
var Drinks = mongoose.model('Drinks');


module.exports.getAllDrinks = function(req, res) {

  Drinks
  .find()
  .exec(function(err, drinks){
    var response = {
      status: 200,
      message: drinks
    };
    if(err){
      console.log('Error getting data: ', err);
      response.status = 500; response.message = {message: "Error getting data"};
    }
    else{
      console.log("Found " + drinks.length + " drink(s)");
    }
    res
      .status(response.status)
      .json(response.message);
  });
}