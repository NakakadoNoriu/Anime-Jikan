const axios = require('axios');

const Anime = require('../models/anime');


//traer los datos desde la api Jikan:
const getInfoApi = async () => {
  try {
    const infoApi = await axios.get(`https://api.jikan.moe/v4/anime`);
    const apiData = infoApi.data.data.map(e => {
      return {
        name: e.title,
        episodes: e.episodes,
        genre: e.genres.map(gen => gen.name),
        synopsis: e.synopsis,
        image: e.images.jpg.image_url,
        studios: e.studios.map(std => std.name),
        year: e.year,
      }
    })
    return apiData;
  } catch (err) {
    console.log(`Surgio error en getInfoApi: ${err}`);
  }
};

//traer los animes desde la DB:
const getAnimeDB = async() => {
  try {
    const allAnimeDB = await Anime.find().populate('genre');
    if(allAnimeDB) return allAnimeDB;
  } catch (err) {
    console.log(`Surgio un error en getAnimeDB: ${err}`);
  };
};

//juntar todos los datos traidos anteriormente:
const getAllAnime = async () => {
  try {
    const animeApi = await getInfoApi();
    const animeDB = await getAnimeDB();
    const allAnime = animeApi.concat(animeDB);
    return allAnime;
  } catch (err) {
    console.log(`surgio un error en getAllanime: ${err}`);
  };
};



module.exports = {
  getAllAnime,
}