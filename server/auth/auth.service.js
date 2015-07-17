'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    .use(normalizeToken)
    // Validate jwt
    .use(function(req, res, next) {
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);

        req.user = user;
        next();
      });
    });
}

/**
 * Attaches the user object to the request if authenticated
 */
function optionalAuth() {
  return compose()
    .use(normalizeToken)
    // Validate jwt if available
    .use(function (req, res, next) {
      validateJwt(req, res, function () {
        next();
      });
    })
    // Attach user to request if logged in
    .use(function (req, res, next) {
      if (req.user && req.user._id) {
        User.findById(req.user._id, function (err, user) {
          if (user)  req.user = user;
          next();
        });
      } else {
        next()
      }
    })
}

function normalizeToken(req, res, next) {
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token;
  }
  next();
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.send(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  // return the user to the request page (oAuth) or homepage
  if (typeof req.cookies.returnUrl !== 'undefined') {
    res.redirect(req.cookies.returnUrl.replace(/"/g, "") || '/');
  } else {
    res.redirect('/');
  }
}

exports.isAuthenticated = isAuthenticated;
exports.optionalAuth = optionalAuth;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
