const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  paymentType: String,
  paymentStatus: String,
  lastFour: Number,
  amount: Number
})

const Payment = mongoose.model('payment', schema);

module.exports = Payment;