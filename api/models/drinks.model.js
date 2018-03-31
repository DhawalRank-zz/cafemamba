var mongoose = require('mongoose');
var drinksSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String
  },
  price: {
    type: String,
    required: true
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  }
});
mongoose.model('Drinks', drinksSchema);