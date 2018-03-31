var express = require('express');
var router = express.Router();
var ctrlDrinks = require('../controllers/drinks.controller.js');

router
  .route('/getalldrinks')
  //get executes function with req and res on its own
  //just pass the function object to it
  .get(ctrlDrinks.getAllDrinks)

module.exports = router;
