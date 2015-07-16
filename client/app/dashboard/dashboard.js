'use strict';

angular.module('workspaceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true
      })
      .state('dashboard.list', {
        url: '/list',
        templateUrl: 'app/dashboard/dashboard.list.html',
        controller: 'DashboardListCtrl',
        authenticate: true
      })
      .state('dashboard.create', {
        url: '/create',
        templateUrl: 'app/dashboard/dashboard.create.html',
        controller: 'DashboardCreateCtrl',
        authenticate: true
      });
  });
