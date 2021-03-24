const router = require('express').Router();
const payment = require('../controllers/payments')

router
  // .get('/', payment.getAll)
  .get('/', payment.getAll)
  .post('/', payment.create)
  .patch('/', (_, res) => res.send('this is payment route'))
  .delete('/', payment.delete)

module.exports = router;