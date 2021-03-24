const Payment = require('../models/payment');

exports.getAll = (_, res) =>
  Payment
    .find({})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ "error": err }))

exports.create = (req, res) => {
  const { paymentType, paymentStatus, lastFour, amount } = req.body;

  Payment
    .create({ paymentType, paymentStatus, lastFour, amount })
    .then(payment => res.status(200).json(payment))
    .catch(err => res.status(500).json({ "err": err }))
}

exports.delete = (req, res) => {
  const { _id } = req.body;

  Payment
    .deleteOne({ _id })
    .then(res.status(200).json({ "Message": "Deletion Success!" }))
    .catch(err => res.status(500).json({ "Error:": err }))
}