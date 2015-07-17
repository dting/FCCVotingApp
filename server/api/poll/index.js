'use strict';

var express = require('express');
var controller = require('./poll.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.optionalAuth(), controller.index);
router.get('/user/:id', auth.isAuthenticated(), controller.userIndex);
router.get('/:id', auth.optionalAuth(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.post('/vote/:id', auth.isAuthenticated(), controller.vote);

module.exports = router;
