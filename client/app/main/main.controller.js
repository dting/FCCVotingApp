'use strict';

var app = angular.module('workspaceApp');

app.controller('MainCtrl', function($scope, $http, Auth) {
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.recentPolls = [];

  $http.get('/api/polls').success(function(polls) {
    $scope.recentPolls = polls;
  });
});
