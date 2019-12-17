const mongoose = require('mongoose');
const TradeSchema = new mongoose.Schema({
  userId1: {
    type: String,
    default: ''
  },
  name1: {
    type: String,
    default: ''
  },
  userId2: {
    type: String,
    default: ''
  },
  owner:{
    type:String,
    default:''
  },
  name2: {
    type: String,
    default: ''
  },
  isTraded1: {
    type: Boolean,
    default: false
  },
  isTraded2: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('Trade', TradeSchema);