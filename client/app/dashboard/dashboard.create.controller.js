'use strict';

angular.module('workspaceApp').controller('DashboardCreateCtrl', function($scope, Poll, Auth, $state) {
  $scope.errors = {};
  $scope.poll = {
    text: '', choices: [{}, {}]
  };

  $scope.addEmptyChoice = function() {
    $scope.poll.choices.push({});
  };
  $scope.removeChoice = function(index) {
    $scope.poll.choices.splice(index, 1);
  };
  $scope.createPoll = function() {
    $scope.pending = true;
    var user = Auth.getCurrentUser();
    Poll.save({
      text: $scope.poll.text, choices: $scope.poll.choices.slice(0), creator: user._id
    }).$promise.then(function() {
      console.log('saved');
      $state.go('dashboard.list');
    }, function(err) {
      $scope.pending = false;
      $scope.errors = err;
    });
  };
});
