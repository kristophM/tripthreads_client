'use strict';
DashboardModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.tmpl.html'
    });
});
