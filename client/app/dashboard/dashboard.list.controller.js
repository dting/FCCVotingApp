'use strict';

angular.module('workspaceApp').controller('DashboardListCtrl', function($scope, $http, Auth) {
  $scope.myPolls = [];
  $http.get('/api/polls/user/' + Auth.getCurrentUser()._id).success(function(polls) {
    $scope.myPolls = polls;
  });
});
