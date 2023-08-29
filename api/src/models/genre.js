const {Schema, model} = require('mongoose');

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
},{
  timestamps: true
});

module.exports = model('Genre', genreSchema);