const express = require('express');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

const artistControllers = require('./controllers/artists');
const list = require('./controllers/artists');
const getArtist = require('./controllers/artists');
const updateArtist = require('./controllers/artists');
const deleteArtist = require('./controllers/artists');

const createAlbum = require('./controllers/albums');
const findAlbum = require('./controllers/albums');
const findAllAlbums = require('./controllers/albums');
const updateAlbum = require('./controllers/albums');
const deleteAlbum = require('./controllers/albums');

const createSong = require('./controllers/songs');

const app = express();

app.use(express.json());

app.post('/artists', artistControllers.create);

app.get('/artists', list.findAll);

app.get('/artists/:id', getArtist.getArtistById);

app.patch('/artists/:id', updateArtist.updateArtistById);

app.delete('/artists/:id', deleteArtist.deleteArtistById);

app.post('/artists/:artistId/albums', createAlbum.albumCreate);

app.get('/artists/:id/albums', findAlbum.getAlbumsById);

app.get('/albums', findAllAlbums.getAllAlbums);

app.patch('/albums/:id', updateAlbum.updateAlbumById);

app.delete('/albums/:id', deleteAlbum.deleteAlbumById);

app.post('/album/:albumId/song', createSong.createSong);

module.exports = app;
