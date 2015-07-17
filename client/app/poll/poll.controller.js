'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $stateParams, Poll, Auth) {
    $scope.vote = {};
    Poll.get({id: $stateParams.id}).$promise.then(function(r) {
      $scope.poll = r;
      $scope.vote.selected = r.selected;
    });
    $scope.vote = function() {
      $scope.pending = true;
      Poll.vote({id:$scope.poll._id, choice:$scope.vote.selected}).$promise.then(function(res) {
        $scope.poll = res;
        $scope.pending = false;
      }, function(err) {
        $scope.errors = err;
        $scope.pending = false;
      });
    };
    $scope.updateVote = function() {
      $scope.pending = true;
      Poll.vote({id:$scope.poll._id, choice:$scope.vote.selected}).$promise.then(function(res) {
        $scope.poll = res;
        $scope.pending = false;
      }, function(err) {
        $scope.errors = err;
        $scope.pending = false;
      });
    };
  });
