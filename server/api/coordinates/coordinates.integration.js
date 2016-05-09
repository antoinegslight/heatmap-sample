'use strict';

var app = require('../..');
import request from 'supertest';

var newCoordinates;

describe('Coordinates API:', function() {

  describe('GET /api/coordinates', function() {
    var coordinatess;

    beforeEach(function(done) {
      request(app)
        .get('/api/coordinates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          coordinatess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      coordinatess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/coordinates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/coordinates')
        .send({
          name: 'New Coordinates',
          info: 'This is the brand new coordinates!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCoordinates = res.body;
          done();
        });
    });

    it('should respond with the newly created coordinates', function() {
      newCoordinates.name.should.equal('New Coordinates');
      newCoordinates.info.should.equal('This is the brand new coordinates!!!');
    });

  });

  describe('GET /api/coordinates/:id', function() {
    var coordinates;

    beforeEach(function(done) {
      request(app)
        .get('/api/coordinates/' + newCoordinates._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          coordinates = res.body;
          done();
        });
    });

    afterEach(function() {
      coordinates = {};
    });

    it('should respond with the requested coordinates', function() {
      coordinates.name.should.equal('New Coordinates');
      coordinates.info.should.equal('This is the brand new coordinates!!!');
    });

  });

  describe('PUT /api/coordinates/:id', function() {
    var updatedCoordinates;

    beforeEach(function(done) {
      request(app)
        .put('/api/coordinates/' + newCoordinates._id)
        .send({
          name: 'Updated Coordinates',
          info: 'This is the updated coordinates!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCoordinates = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCoordinates = {};
    });

    it('should respond with the updated coordinates', function() {
      updatedCoordinates.name.should.equal('Updated Coordinates');
      updatedCoordinates.info.should.equal('This is the updated coordinates!!!');
    });

  });

  describe('DELETE /api/coordinates/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/coordinates/' + newCoordinates._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when coordinates does not exist', function(done) {
      request(app)
        .delete('/api/coordinates/' + newCoordinates._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
