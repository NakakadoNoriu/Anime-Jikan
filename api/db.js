const mongoose = require('mongoose');
const {MONGO_DB_NAME, MONGO_DB_HOST} = process.env;
const MONGO_URI = `mongodb://${MONGO_DB_HOST}/${MONGO_DB_NAME}`;

mongoose.connect(MONGO_URI,{
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(db => console.log('Database connected'))
  .catch(err => console.log(err));