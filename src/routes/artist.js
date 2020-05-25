const express = require('express');
const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');

const router = express.Router();

router
  .route('/')
  .post(artistController.create)
  .get(artistController.findAll);

router
  .route('/:id')
  .get(artistController.getArtistById)
  .patch(artistController.updateArtistById)
  .delete(artistController.deleteArtistById);

router
  .route('/:id/albums')
  .post(albumController.albumCreate)
  .get(albumController.getAlbumsById);

module.exports = router;