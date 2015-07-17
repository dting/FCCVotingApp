'use strict';

var app = angular.module('workspaceApp');

app.controller('MainCtrl', function($scope, $http, $state, Auth) {
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.recentPolls = [];

  $http.get('/api/polls').success(function(polls) {
    console.log(polls);
    $scope.recentPolls = polls;
  });
});
