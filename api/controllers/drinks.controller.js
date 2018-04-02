var mongoose = require('mongoose');
var Drinks = mongoose.model('Drinks');
var commonutils = require('../utils/commonutils')

module.exports.addDrink = function(req, res) {
  if(req.body && req.body.name && req.body.startDate && req.body.endDate && req.body.price) {
    var regex = new RegExp(/(\d{4})\/(\d{2})\/(\d{2})/);

    if(!regex.test(req.body.startDate) || !regex.test(req.body.endDate) || isNaN(parseFloat(req.body.price))){
      res
        .status(400)
        .json({status: 400, message: "Bad Request"})
    }
    else {
      Drinks.create({
        name: req.body.name,
        type: req.body.type || null,
        price: req.body.price,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        contents: req.body.contents || null
      }, function(err, aDrink) {
        let response = {status: 520, message: {status: 520, message: "Unknown Error"}};
        if(err) {
          console.error(err);
          response = {status: 400, message: {status: 400, message: err.message}}
        }
        else{
          response = {status: 201, message: aDrink};
        }
        res
          .status(response.status)
          .json(response.message);
      })
    }

  }
  else {
    res
      .status(400)
      .json({status: 400, message: "Bad Request"})
  }
}

module.exports.mainDrinksController = function(req, res) {

  if(req.query.date === undefined) {
    getAllDrinks(req, res);
  }
  else {
    getDrinksInDate(req, res);
  }

}

const getAllDrinks = (req, res) => {
  var offset = 0, count = 10;
  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }

  Drinks
  .find()
  .exec(function(err, drinks){
    let response = {status: 520, message: {status: 520, message: "Unknown Error"}};
    if(err){
      console.error(err);
      response = {status: 400, message: {status: 400, message: err.message}}
    }
    else if(drinks === null) {
      console.warn("No data found")
      response = {status: 204, message: "No Content"};
    }
    else{
      console.log("Found " + drinks.length + " drink(s)");
      response = {status: 200, message: drinks.slice(offset, offset+count)}
    }
    console.log("Response: ", response)
    res
      .status(response.status)
      .json(response.message);
  });
}

module.exports.getDrinkByName = function(req, res) {
  Drinks
  .findOne({name: req.params.name})
  .exec(function(err, foundDrink){
    let response = {status: 520, message: {"status": 520, "message": "Unknown Error"}};
    if(err){
      console.error(err);
      response = {status: 400, message: {status: 400, message: err.message}}
    }
    else if(foundDrink === null) {
      console.warn("No data found")
      response = {status: 204, message: ""}
    }
    else{
      response = {status: 200, message: foundDrink}
    }

    console.log("Response: ", response)
    res
      .status(response.status)
      .json(response.message);
  });
}

const getDrinksInDate = (req, res) => {
  if(req.query.date === '' || isNaN(Date.parse(req.query.date))) {
    var response = {status: 400, message: {status: 400, message: 'Bad Request'}}
    console.log(response)
    res
      .status(400)
      .json(response)
  }
  else {
    Drinks
      .find()
      .exec(function(err, drinks){
        let response = {status: 520, message: {status: 520, message: "Unknown Error"}};
        if(err){
          console.error(err);
          response = {status: 400, message: {status: 400, message: err.message}}
        }
        else if(drinks === null) {
          console.warn("No data found")
          response = {status: 204, message: "No Content"};
        }
        else {
          let message = drinks.filter(aDrink => {
                            return commonutils.isDateIn(aDrink.startDate, aDrink.endDate, req.query.date);
                          });
          if(message.length === 0) {
            console.warn("No data found")
            response = {status: 204, message: "No Content"};          
          }
          else {
            response = {status: 200, message: message};
          }
        }
        console.log(response)
        res
          .status(response.status)
          .json(response.message);
      });
  }
}

module.exports.deleteDrink = function(req, res) {
  Drinks
    .findOneAndRemove({name: req.params.name})
    .exec(function(err, deletedDrink){
      let response = {status: 520, message: {status: 520, message: "Unknown Error"}};
      if(err){
        console.error(error);
        response = {status: 400, message: {status: 400, message: err.message}}
      }
      else if(deletedDrink === null) {
        console.warn("No data found")
        response = {status: 204, message: ""}
      }
      else{
        response = {status: 200, message: deletedDrink}
      }

      console.log('Response: ', response)
      res
        .status(response.status)
        .json(response.message)
    });
}