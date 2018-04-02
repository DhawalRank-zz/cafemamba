var express = require('express');
var router = express.Router();
var ctrlDrinks = require('../controllers/drinks.controller.js');

router
  .route('/drinks')
  //get executes function with req and res on its own
  //just pass the function object to it
  .get(ctrlDrinks.mainDrinksController)
  .post(ctrlDrinks.addDrink)

router
  .route('/drinks/:name')
  .get(ctrlDrinks.getDrinkByName)
  .delete(ctrlDrinks.deleteDrink)

module.exports = router;
