'use strict';
FTUXModule.controller('NewItineraryFTUXCtrl', ['$scope', function($scope) {
  $scope.climates = ['Tropical', 'Rainy', 'Wintery'];
  $scope.destination = {};
  $scope.destination.city = '';
  //Style profile
  $scope.availableStyleTypes = ['Classic', 'Girly', 'Edgy', 'Casual', 'Preppy', 'Glamorous', 'Trendsetter', 'Business'];
  $scope.preferredColors = ['#751241', '#e8b379', '#a6a6a6', '#b0c4d8', '#93ab85', '#ddb6b4',
                            '#f71947', '#2fa456', '#0052a4', '#9000c3', '#d80000', '#f77906', '#ffcc00'];
  $scope.preferredPatterns = ['Lace', 'Stripe', 'Polka Dot', 'Animal', 'Solid'];
  $scope.preferredBrands = ['Alexander McQueen', 'Chiara Ferragni', 'Celine'];
  $scope.age;
  $scope.additionalFacts = ['I am expecting a little one', 'I am curvy with a lot more to love', 'I love animals, not wearing them!']
  console.log(typeof $scope.destination.city);
}]);
