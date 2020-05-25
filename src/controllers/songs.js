/* src/controllers/songs.js */
const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');
const { Song } =require('../sequelize');

exports.createSong = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then(album => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      const newSong = {
        name: req.body.name,
        artistId: req.body.artist,
        albumId: parseInt(albumId),
      };
      Song.create(newSong).then((song) => {
        res.status(201).json(song);
      });
      };
  });
};

exports.findAllSongs = (req, res) => {
  Song.findAll().then(song => {
    if (!song) {
      res.status(404).json({ error: 'The album does not exist.'});
    } else {
      res.status(200).json(song);
  };
});
};

exports.updateSongById = (req, res) => {
  const { id } = req.params;
  Song.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The song could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    };
  });
};

exports.deleteSongById = (req, res) => {
  const { id } = req.params;
  Song.findByPk(id).then(song => {
    if (!song) {
      res.status(404).json({error: 'The song could not be found.'});
    } else {
      Song.destroy({where: { id } }).then(deletedRow => {
        res.status(204).json(deletedRow);
      });
    };
  });
};