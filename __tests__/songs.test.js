/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/sequelize');

describe('/songs', () => {
  let artist;
  let album;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
      album = await Album.create({
        name: 'InnerSpeaker',
        year: 2010,
        artistId: artist.id,
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /album/:albumId/song', () => {
    it('creates a new song under an album', (done) => {
      request(app)
        .post(`/album/${album.id}/song`)
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          const songId = res.body.id;
          expect(res.body.id).to.equal(songId);
          expect(res.body.name).to.equal('Solitude Is Bliss');
          expect(res.body.artistId).to.equal(artist.id);
          expect(res.body.albumId).to.equal(album.id);
          done();
        });
    });

    it('returns a 404 if the album does not exist', (done) => {
      request(app)
        .post('/album/12345/song')
        .send({
          artist: artist.id,
          name: 'Shelbs',
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The album could not be found.');
          done();
        });
    });
  });

  describe('with songs in the database', () => {
    let songs;
    beforeEach((done) => {
      Promise.all([
        Song.create({ name: 'This Song', artist: artist.id, album: album.id }),
        Song.create({ name: 'That Song', artist: artist.id, album: album.id }),
        Song.create({ name: 'Next Song', artist: artist.id, album: album.id }),
      ]).then((documents) => {
        songs = documents;
        done();
      });
    });
  

  describe('GET /album/:albumId/song', () => {
    it('gets song by id', (done) => {
      request(app)
        .get(`/album/${album.id}/song`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
          res.body.forEach((song) => {
            const expected = songs.find((a) => a.id ===song.id);
            expect(song.name).to.equal(expected.name);
          });
          done();
        });
    });
  });

  describe('PATCH /album/:albumId/song', () => {
    it('updates song name by id', (done) => {
      const song = songs[0];
      console.log(song, 'song');
      request(app)
        .patch(`/album/${song.id}/song`)
        .send({ name: 'New Song' })
        .then((res) => {
          expect(res.status).to.equal(200);
          Song.findByPk(song.id, { raw: true}).then((updatedSong) => {
            expect(updatedSong.name).to.equal('New Song');
            done();
        });
    });
  });

  it('returns a 404 if the song does not exist', (done) => {
    request(app)
      .patch('/album/12345/song')
      .send({ name: 'New Song' })
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('The song could not be found.');
        done();
      });
  });
});

describe('DELETE /album/:albumId/song', () => {
  it('deletes a song record by id', (done) => {
    const song = songs[0];
    request(app)
      .delete(`/album/${song.id}/song`)
      .then((res) => {
        expect(res.status).to.equal(204);
        Song.findByPk(song.id, { raw: true }).then((updatedSong) => {
          expect(updatedSong).to.equal(null);
          done();
        });
      });
  });
});




}); // promise all
  });