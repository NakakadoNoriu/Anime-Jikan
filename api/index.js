require("dotenv").config();
const routerAnime = require("./src/routes/anime.routes");
const routerGenre = require("./src/routes/genre.routes");
const app = require("./server");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
require("./db"); //primero acegurar si funcionan los modelos

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//ruta para traer todos los animes;
app.use("/api", routerAnime);
app.use("/api", routerGenre);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
