'use strict';

angular.module('workspaceApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state) {
    $scope.menu = [{
      'title': 'Dashboard',
      'baseState': 'dashboard',
      'state': 'dashboard.list',
      'authReq': true
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.state = $state;
  });
