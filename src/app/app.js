'use strict';

var TriphThreadsApp = angular.module('TripThreads', [
  //Internal modules
  'AuthModule',
  'DashboardModule',
  'FTUXModule',
  //3rd Party modules
  'ui.router',
  'ngCookies'
]);

var AuthModule = angular.module('AuthModule', ['ui.router', 'ngCookies']);
var DashboardModule = angular.module('DashboardModule', ['ui.router']);
var FTUXModule = angular.module('FTUXModule', ['ui.router']);

TriphThreadsApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        'main': {templateUrl: 'app/home/home.tmpl.html'},
        '_what-is@home': {templateUrl: 'app/home/_what-is.tmpl.html'},
        '_how-it-works@home': {templateUrl: 'app/home/_how-it-works.tmpl.html'},
        '_brands-we-offer@home': {templateUrl: 'app/home/_brands-we-offer.tmpl.html'},
        '_get-started@home': {templateUrl: 'app/home/_get-started.tmpl.html'},
        '_footer@home': {templateUrl: 'app/home/_footer.tmpl.html', controller: 'HomeCtrl'}
      }
    })
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'app/auth/login.tmpl.html'
    });
});
// angular.module('TripThreads', [])
