const express = require("express");
const router = express();

const {
  getAnimeApi,
  createAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/index");

//ruta para traer todas los animes: ====================
router.get("/animes", getAnimeApi);

//ruta para ingresar nuevos animes: ====================
router.post("/anime", createAnime);

//ruta para actualizar los animes: ====================
router.put("/anime/:id", updateAnime);

//eliminar los animes: ====================
router.delete("/anime/:id", deleteAnime);

module.exports = router;
