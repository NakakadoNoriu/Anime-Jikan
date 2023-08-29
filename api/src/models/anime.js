const {Schema, model} = require('mongoose');
const Genre = require('./genre');

const animeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  episodes: {
    type: Number,
    required: true
  },
  genre: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Genre"
  }],
  synopsis: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  studios: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
},{
  timestamps: true,
}); 

module.exports = model('Anime',animeSchema);
