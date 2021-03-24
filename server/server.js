// Vital imports
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes')

// Environement variables
require('dotenv').config({ path: '../.env' });
const { DB_USER, DB_PWD, DB_DB } = process.env;

const app = express();

mongoose.connect(`mongodb://${DB_USER}:${DB_PWD}@0.0.0.0:27017/test?authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 10,
})
  .then(console.log('db connection success'))
  .catch(err => console.log(err));

app.use(morgan('combined'));
app.use(express.json({ extended: true }));
app.use(cors('http://localhost'));

app.use('/api/payment', router.payment);
app.use('/api', (_, res) => { res.send('api route is working') });
app.use('*', (_, res) => res.send('404'));

module.exports = app;