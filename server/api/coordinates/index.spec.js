'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var coordinatesCtrlStub = {
  index: 'coordinatesCtrl.index',
  show: 'coordinatesCtrl.show',
  create: 'coordinatesCtrl.create',
  update: 'coordinatesCtrl.update',
  destroy: 'coordinatesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var coordinatesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './coordinates.controller': coordinatesCtrlStub
});

describe('Coordinates API Router:', function() {

  it('should return an express router instance', function() {
    coordinatesIndex.should.equal(routerStub);
  });

  describe('GET /api/coordinates', function() {

    it('should route to coordinates.controller.index', function() {
      routerStub.get
        .withArgs('/', 'coordinatesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/coordinates/:id', function() {

    it('should route to coordinates.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'coordinatesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/coordinates', function() {

    it('should route to coordinates.controller.create', function() {
      routerStub.post
        .withArgs('/', 'coordinatesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/coordinates/:id', function() {

    it('should route to coordinates.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'coordinatesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/coordinates/:id', function() {

    it('should route to coordinates.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'coordinatesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/coordinates/:id', function() {

    it('should route to coordinates.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'coordinatesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
