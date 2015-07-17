'use strict';

angular.module('workspaceApp').controller('DashboardListCtrl', function($scope, $http, Auth, Poll) {
  $scope.myPolls = [];
  $http.get('/api/polls/user/' + Auth.getCurrentUser()._id).success(function(polls) {
    $scope.myPolls = polls;
  });
  $scope.delete = function(poll) {
    Poll.delete({id:poll._id}, poll);
  };
});
