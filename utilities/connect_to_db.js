const mongoose = require('mongoose');

const connectionToMongo = () => mongoose.connect(
  process.env.mongo_url,
  { useNewUrlParser: true },
  () => {
    console.log('Mongo has connected successfully');
  }
);

module.exports = connectionToMongo;