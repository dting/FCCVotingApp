'use strict';

angular.module('workspaceApp').service('Poll', function(Auth, $modal, $resource) {
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
  this.delete = function(req, poll) {
    return $modal.open({
      templateUrl: 'app/poll/poll.delete.modal.html',
      controller: ['$scope', '$state', function($scope, $state) {
        $scope.poll = poll;
        $scope.dismiss = function() {
          $scope.$dismiss();
        };

        $scope.delete = function() {
          pollResource.delete(req).$promise.then(function() {
            $scope.$close(true);
            $state.go('dashboard.list');
          });
        };
      }]
    });
  };
});
