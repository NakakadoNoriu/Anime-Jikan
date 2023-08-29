const express = require('express');
const router = express();

const {getAllGenre} = require('../controllers/index');

//trae todo los generos
router.get('/genre', getAllGenre);

module.exports = router;