'use strict';

angular.module('workspaceApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/dashboard', '/dashboard/list');
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
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
