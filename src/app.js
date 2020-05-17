const express = require('express');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

const artistControllers = require('./controllers/artists');
const list = require('./controllers/artists');
const getArtist = require('./controllers/artists');
const updateArtist = require('./controllers/artists');
const deleteArtist = require('./controllers/artists');

const app = express();

app.use(express.json());

app.post('/artists', artistControllers.create);

app.get('/artists', list.findAll);

app.get('/artists/:id', getArtist.getArtistById);

app.patch('/artists/:id', updateArtist.updateArtistById);

app.delete('/artists/:id', deleteArtist.deleteArtistById);

module.exports = app;
