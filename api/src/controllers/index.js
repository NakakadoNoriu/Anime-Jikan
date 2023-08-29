const { getAllAnime } = require("./anime.controllers");
const { getGenreApi } = require("./genre.controllers");
const Genre = require("../models/genre");
const Anime = require("../models/anime");

//varificacion si desde controllers trae los datos
//para la busqueda por nombre el URL sintaxis : http://localhost:3001/api/animes?name=Eyeshield 21
const getAnimeApi = async (req, res) => {
  const { name } = req.query; //si ingresan nombre lo busca y renderisa
  try {
    const allAnime = await getAllAnime();
    if (name) {
      let animeName = await allAnime.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      animeName
        ? res.send(animeName)
        : res.status(404).send(`No esta registrado un anime con dicho nombre`);
    } else {
      res.send(allAnime);
    }
  } catch (err) {
    res.send(`Surgio un error al en getAnimeApi: ${err}`);
  }
};




//traer y guardar todo los generos a la DB:
const getAllGenre = async (req, res) => {
  try {
    const allGenre = await getGenreApi(); //trae un array de objetos con todos los generos de anime del api repetidos

    const genreFind = await Genre.find();
    if (genreFind.length > 0) {
      //si existe algo en la DB lo uestra
      res.send(genreFind);
    } else {
      //si no existe datos en DB ingresa los generos
      //despues de almacenar todo deja de funcionar: ===============
      let arrGenre = [];

      allGenre.forEach((e) => {
        //para iterar a los valores del array de objetos
        e.name.forEach((el) => {
          arrGenre.push(el); //y hacer push al array "arrGenre" solo los valores
        });
      });

      arrGenre = new Set(arrGenre); //reescribindo y ahora almacena un objeto de los generos sin repetirse

      [...arrGenre].forEach((e) => {
        let genre = new Genre({ name: e });
        genre.save();
      });

      const genre = await Genre.find();
      res.send(genre);
      //================================================
    }
  } catch (err) {
    console.log(`hay un error en getAllGenre${err}`);
  }
};




//ruta de ingresar nuevos animes;
const createAnime = async (req, res) => {
  try {
    const { name, episodes, genre, synopsis, image, studios, year } = req.body;

    const animeName = await Anime.find({ name: name }); //busqueda de coincidencia por nombre===========
    if ( //si falta algun dato no sigue con la creacion===============
      !name ||
      !episodes ||
      !genre ||
      !synopsis ||
      !image ||
      !studios ||
      !year
    ) {
      res.status(500).send("Falta rellenar algunas partes del formulario");
    };

    // if (animeName) { //si existe envia mensaje de que ya existe==============
    //   res.send("Ya existe un anime con ese nombre");
    // };

    const newAnime = new Anime({ //creacion del nuevo anime====================
      name,
      episodes,
      genre,
      synopsis,
      image,
      studios,
      year,
    });
  
     //si coloca genero,
    const findGenre = await Genre.find({name:{$in:genre}}); //busca los generos desde el modelo de Genre
    if(!findGenre){ //si coincide los generos 
      res.send(`Debe ingresar solamente los generos que se presentan`);
    }else{
      newAnime.genre = findGenre.map((e) => e._id);  //solo agarra el _id de genre y lo garda 
    };
    

    await newAnime.save(); // almacena los datos ingresados del formulario

    res.send(`Se creo el anime perfectamente`);
  } catch (err) {
    res.send(`hay un error en createAnime: ${err}`);
  }
};




//actualizar un anime:==========================
const updateAnime = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, episodes, genre, synopsis, image, studios, year } = req.body;

    if ( //si falta algun dato no sigue con la actualizacion de datos===============
      !name ||
      !episodes ||
      !genre ||
      !synopsis ||
      !image ||
      !studios ||
      !year
    ) {
      res.status(500).send("Falta rellenar algunas partes del formulario");
    };

    const animeData = { name, episodes, genre, synopsis, image, studios, year };

    const findGenre = await Genre.find({name: {$in:genre}})

    if(!findGenre){ 
      res.send(`Debe ingresar solamente los generos que se presentan`);
    }else{
      animeData.genre = findGenre.map((e) => e._id);
      await Anime.findByIdAndUpdate(id, animeData);  
    }
    
    res.send(`dato actualizado`)
  } catch (err) {
     res.status(500).send(`hay un error updateAnime: ${err}`);
  };
};



//Eliminar datos solamente de la base de datos =======================
const deleteAnime = async (req, res) => {
  try {
    const {id} = req.params;
    const animeId = await Anime.findById(id);
    if(!animeId){
      res.status(404).send(`No existe un anime con el Id ingresado`);
    }else{
      await Anime.deleteOne({ _id: id });
      // console.log(animeId);
      res.send(`Anime eliminado correctamente!`);
    };

  } catch (err) {
    res.status(500).send(`Hay un error en deleteAnime: ${err}`)
  };
};

module.exports = {
  getAnimeApi,
  getAllGenre,
  createAnime,
  updateAnime,
  deleteAnime,
};
