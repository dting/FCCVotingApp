'use strict';

angular.module('workspaceApp').controller('DashboardCreateCtrl', function($scope, $http, Auth, $state) {
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
    var pollObj = {
      text: $scope.poll.text, choices: $scope.poll.choices.slice(0), creator: Auth.getCurrentUser()._id
    };
    $http.post('/api/polls', pollObj).success(function() {
      $state.go('dashboard.list');
    }).error(function(err) {
      $scope.pending = false;
      $scope.errors = err;
    });
  };
});
