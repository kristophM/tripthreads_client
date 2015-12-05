'use strict';
angular.module('TripThreads').controller('NewItineraryFTUXCtrl', ['$scope', function($scope) {
  $scope.climates = ['Tropical', 'Rainy', 'Wintery'];
  $scope.destination = {};
  $scope.destination.city = '';
  console.log(typeof $scope.destination.city);
}]);
