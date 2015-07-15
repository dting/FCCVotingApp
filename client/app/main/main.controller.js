'use strict';

var app = angular.module('workspaceApp');

app.controller('MainCtrl', function($scope, $http, Auth) {
  $scope.isLoggedIn = Auth.isLoggedIn;
});
