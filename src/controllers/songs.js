/* src/controllers/songs.js */
const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');
const { Song } =require('../sequelize');

exports.createSong = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then(album => {
    console.log(albumId, 'album id');
    if (!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      const newSong = {
        name: req.body.name,
        artistId: req.body.artist,
        albumId: parseInt(albumId),
      };
      Song.create(newSong).then((song) => {
        console.log(newSong, 'new song');
        res.status(201).json(song);
      });
      };
  });
};