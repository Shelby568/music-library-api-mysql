const express = require('express');
const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');

const router = express.Router();

router
  .route('/')
  .get(albumController.getAllAlbums);

router
  .route('/:id')
  .patch(albumController.updateAlbumById)
  .delete(albumController.deleteAlbumById);

module.exports = router;