const express = require('express');
const heroes = express();
heroes.use(express.json());

const rutaHeroe = require('./routes/hores');
heroes.use('/api/heroes', rutaHeroe);

const rutaPoderes = require('./routes/poderes');
heroes.use('/api/poderes', rutaPoderes);

const rutaHeroePodres = require('./routes/heroesPoderes');
heroes.use ('/api/heroespoderes/', rutaHeroePodres);

heroes.listen(4000);

