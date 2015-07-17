'use strict';

angular.module('workspaceApp').service('Poll', function(Auth, $resource) {
  var pollResource = $resource('/api/polls/:id', {id:'@id'});
  var voteResource = $resource('/api/polls/vote/:id', {id:'@id'});
  this.get = function(req) {
    return pollResource.get(req);
  };
  this.save = function(req) {
    return pollResource.save(req);
  };
  this.vote = function(req) {
    return voteResource.save(req);
  };
});
