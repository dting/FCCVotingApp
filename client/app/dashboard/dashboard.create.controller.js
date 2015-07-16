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
    var user = Auth.getCurrentUser();
    var pollObj = {
      text: $scope.poll.text, choices: $scope.poll.choices.slice(0), creator: user._id, creator_name: user.name
    };
    $http.post('/api/polls', pollObj).success(function() {
      $state.go('dashboard.list');
    }).error(function(err) {
      $scope.pending = false;
      $scope.errors = err;
    });
  };
});
