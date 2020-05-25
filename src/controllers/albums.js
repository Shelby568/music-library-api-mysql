/* src/controllers/albums.js */
const { Album } = require('../sequelize')
const { Artist } = require('../sequelize');

exports.albumCreate = (req, res) => {
  const { id } = req.params;

  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({error: 'The artist could not be found.'});
    } else {
      Album.create(req.body).then(album => {
        album.setArtist(id).then(album => {
          res.status(201).json(album);
        });
      });
  };
});
};

exports.getAlbumsById = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({error: 'The artist could not be found.'});
    } else {
     Album.findAll().then(album => {
      res.status(200).json(album);
     })
    };
  });
};

exports.getAllAlbums = (req, res) => {
  Album.findAll().then(album => res.status(200).json(album));
};

exports.updateAlbumById = (req, res) => {
  const { id } = req.params;
  
  Album.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteAlbumById = (req, res) => {
  const { id } = req.params;
  Album.findByPk(id).then(album => {
    if (!album) {
      res.status(404).json({error: 'The artist could not be found.'});
    } else {
  Album.destroy({ where: { id } }).then(deletedRow => {
      res.status(204).json(deletedRow);
});
    };
  });
}