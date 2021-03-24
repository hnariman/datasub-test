const Payment = require('../models/payment');
const timeoutQueue = require('timeout-queue');

// not sure if moving helper functions away will make code more readable
// from my experience I had both opinions in different teams. 
// so just left helpers here.

const update = ({_id}) => {
  Payment
  .findByIdAndUpdate({ _id }, { paymentStatus: randomStatus() })
  .then(console.log)
  .catch();
}

const queue = timeoutQueue(40000, update );

const findLastFour = (body) => {
  switch (body.payment) {
    case 'ach':
      return body.account;
    case 'card':
      return body.card;
    case 'token':
      return body.token;
  }
}

const randomStatus = () => {
  const status = ['approved', 'declined', 'error'];
  return status[Math.floor(Math.random() * status.length)]
}

exports.getAll = (_, res) =>
  Payment
    .find({})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ "error": err }))

exports.create = (req, res) => {
  const paymentType = req.body.payment;
  const amount = req.body.amount;
  const paymentStatus = 'processing';
  const routingNumber = req.body.routingNumber || null;
  const lastFour = findLastFour(req.body).slice(-4);

  Payment
    .create({ paymentType, paymentStatus, routingNumber, lastFour, amount })
    .then(payment => {
      res.status(200).json(payment);
      // waitAndUpdate(payment._id);
      queue.push(payment._id)
    })
    .catch(err => res.status(500).json({ "err": err }))
}

exports.delete = (req, res) => {
  const { _id } = req.body;
  Payment
    .deleteOne({ _id })
    .then(res.status(200).json({ "Message": "Deletion Success!" }))
    .catch(err => res.status(500).json({ "Error:": err }))
}

