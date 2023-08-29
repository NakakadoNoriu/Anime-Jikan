const axios = require('axios');
const Genre = require('../models/genre');

//almacenar todo los generos a la DB:
const getGenreApi = async () => {
  try {
    const apiData = await axios.get(`https://api.jikan.moe/v4/anime`);
    const allGenre = apiData.data.data.map(e => {
      return {
        name: e.genres.map(el => el.name)
      };
    });
    return allGenre;
  } catch (err) {
    console.log(`Surgio un error en getGenreApi: ${err}`);
  }
};

module.exports = {getGenreApi};
