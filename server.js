const mongoose = require('mongoose');

const app = require('./app');

const DB_HOST =
  'mongodb+srv://Eujinn:QZqQtLkTaKRcG9Uf@cluster0.v4ll3w5.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
