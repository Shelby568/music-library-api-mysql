const express = require('express');
const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');
const songController = require('../controllers/songs');

const router = express.Router();

router
  .route('/:albumId/song')
  .post(songController.createSong)
  .get(songController.findAllSongs);

router
  .route('/:id/song')
  .patch(songController.updateSongById)
  .delete(songController.deleteSongById);

module.exports = router;
