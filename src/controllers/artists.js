/* src/controllers/artists.js */
const { Artist } = require('../sequelize');

exports.create = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.findAll = (req, res) => {
  Artist.findAll().then(user => res.status(200).json(user));
};

exports.getArtistById = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};

exports.updateArtistById = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteArtistById = (req, res) => {
  const { id } = req.params;
  Artist.destroy({ where: { id } }).then(deletedRow => {
    if (!deletedRow) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
    res.status(204).json(deletedRow);
    }
  });
};
