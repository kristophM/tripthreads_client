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

'use strict';
FTUXModule.controller('NewItineraryFTUXCtrl', ['$scope', function($scope) {
  $scope.climates = ['Tropical', 'Rainy', 'Wintery'];
  $scope.destination = {};
  $scope.destination.city = '';
  //Style profile
  $scope.styleTypes = ['Classic', 'Girly', 'Edgy', 'Casual', 'Preppy', 'Glamorous', 'Trendsetter', 'Business'];
  $scope.preferredColors = ['#751241', '#e8b379', '#a6a6a6', '#b0c4d8', '#93ab85', '#ddb6b4',
                            '#f71947', '#2fa456', '#0052a4', '#9000c3', '#d80000', '#f77906', '#ffcc00'];
  $scope.preferredPatterns = ['Lace', 'Stripe', 'Polka Dot', 'Animal', 'Solid'];
  $scope.preferredBrands = ['Alexander McQueen', 'Chiara Ferragni', 'Celine'];
  $scope.age;
  $scope.additionalFacts = ['I am expecting a little one', 'I am curvy with a lot more to love', 'I love animals, not wearing them!']
  console.log(typeof $scope.destination.city);
}]);

'use strict';

angular.module('TripThreads').controller('HomeCtrl', ['$scope', function($scope) {
  $scope.dateYear = new Date();
}]);

'use strict';
DashboardModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.tmpl.html'
    });
});

'use strict';
//FTUX = "first time user experience"
FTUXModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('get-started', {
      url: '/get-started',
      controller: 'NewItineraryFTUXCtrl',
      abstract:true,
      views: {
        'main': {
          templateUrl: 'app/get-started/get-started.tmpl.html'
        }
      }
    })
    //Style-profile specific information.
    //This is more or less permanently stored information linked to the customer's style profile
    .state('get-started.style-type', {
      url: '',
      views: {
        'get-started': {
          templateUrl: 'app/style-profile/ftux/_style-type.tmpl.html',
          controller: 'NewItineraryFTUXCtrl'
        }
      }
    })
    .state('get-started.preferred-colors', {
      url: '/preferred-colors',
      views: {
        'get-started': {
          templateUrl: 'app/style-profile/ftux/_preferred-colors.tmpl.html',
          controller: 'NewItineraryFTUXCtrl'
        }
      }
    })
    .state('get-started.preferred-patterns', {
      url: '/preferred-patterns',
      views: {
        'get-started': {
          templateUrl: 'app/style-profile/ftux/_preferred-patterns.tmpl.html',
          controller: 'NewItineraryFTUXCtrl'
        }
      }
    })
    .state('get-started.preferred-brands', {
      url: '/preferred-brands',
      views: {
        'get-started': {
          templateUrl: 'app/style-profile/ftux/_preferred-brands.tmpl.html',
          controller: 'NewItineraryFTUXCtrl'
        }
      }
    })
    .state('get-started.age', {
      url: '/age',
      views: {
        'get-started': {
          templateUrl: 'app/style-profile/ftux/_age.tmpl.html',
          controller: 'NewItineraryFTUXCtrl'
        }
      }
    })
    .state('get-started.additional-info', {
      url: '/additional-info',
      views: {
        'get-started': {
          templateUrl: 'app/style-profile/ftux/_additional-info.tmpl.html',
          controller: 'NewItineraryFTUXCtrl'
        }
      }
    })
    //Itinerary-specific information. Unlike the above section, this section stores information specific to the customer's first itinerary.
    .state('get-started.destination', {
      url: '/destination',
      views: {
        'get-started': {
          templateUrl: 'app/itinerary/ftux/_destination.tmpl.html',
          controller: 'NewItineraryFTUXCtrl'
        }
      }
    })
    .state('get-started.climate', {
      url: '/climate',
      views: {
        'get-started': {
          templateUrl: 'app/itinerary/ftux/_climate.tmpl.html',
          controller: 'NewItineraryFTUXCtrl'
        }
      }
    });
})

'use strict';
AuthModule.controller('LoginCtrl', ['$scope', 'AuthFact', '$state', '$cookies', function($scope, AuthFact, $state, $cookies) {
  //Authenticate a user and receive a token if user is valid
  $scope.submitCredentials = function() {
    AuthFact.authenticateUser($scope.email, $scope.password).then(function() {
      if (AuthFact.status === 201) {
        //Store in local storage
        $cookies.put('tripthreadsAuthToken', AuthFact.token);
        //Redirect to /dashboard
        $state.go('dashboard');
      }
      //if unauthorized
      else if (AuthFact.status === 401) {
        alert('You entered an incorrect email/password confirmation. Please try again.');
      }
      else {
        alert('There was an error communicating with the server. Please try again and contact customer service if the issue persists! (Error code: 1H)');
      }
    },
    //Unsuccessful event response
    function() {
      //If some other error happened en route to the server
      alert('There was an error communicating with the server. Please try again and contact customer service if the issue persists! (Error code: 1H)');
    });
  };
}]);

'use strict';
AuthModule.factory('AuthFact', ['$http', function($http) {
  var AuthFact = {};
  var authUrl = 'http://localhost:3000/api/sessions';

  AuthFact.authenticateUser = function(email, password) {
    var credentials = {}; credentials.email = email; credentials.password = password;
    return $http.post(authUrl, credentials).then(function(response) {
      if (response.status === 201) {
        AuthFact.token = response.data.token;
      }
      AuthFact.status = response.status;
    },
    function(response) {
      AuthFact.status = response.status;
    });
  }

  return AuthFact;
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImdldC1zdGFydGVkL2dldC1zdGFydGVkLmN0cmwuanMiLCJob21lL2hvbWUuY3RybC5qcyIsInJvdXRpbmcvZGFzaGJvYXJkLXJvdXRlcy5qcyIsInJvdXRpbmcvZnR1eC1yb3V0ZXMuanMiLCJhdXRoL2F1dGguY3RybC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvYXV0aC5mYWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFRyaXBoVGhyZWFkc0FwcCA9IGFuZ3VsYXIubW9kdWxlKCdUcmlwVGhyZWFkcycsIFtcbiAgLy9JbnRlcm5hbCBtb2R1bGVzXG4gICdBdXRoTW9kdWxlJyxcbiAgJ0Rhc2hib2FyZE1vZHVsZScsXG4gICdGVFVYTW9kdWxlJyxcbiAgLy8zcmQgUGFydHkgbW9kdWxlc1xuICAndWkucm91dGVyJyxcbiAgJ25nQ29va2llcydcbl0pO1xuXG52YXIgQXV0aE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdBdXRoTW9kdWxlJywgWyd1aS5yb3V0ZXInLCAnbmdDb29raWVzJ10pO1xudmFyIERhc2hib2FyZE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdEYXNoYm9hcmRNb2R1bGUnLCBbJ3VpLnJvdXRlciddKTtcbnZhciBGVFVYTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ0ZUVVhNb2R1bGUnLCBbJ3VpLnJvdXRlciddKTtcblxuVHJpcGhUaHJlYWRzQXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9ob21lJyk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvaG9tZScsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnbWFpbic6IHt0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL2hvbWUudG1wbC5odG1sJ30sXG4gICAgICAgICdfd2hhdC1pc0Bob21lJzoge3RlbXBsYXRlVXJsOiAnYXBwL2hvbWUvX3doYXQtaXMudG1wbC5odG1sJ30sXG4gICAgICAgICdfaG93LWl0LXdvcmtzQGhvbWUnOiB7dGVtcGxhdGVVcmw6ICdhcHAvaG9tZS9faG93LWl0LXdvcmtzLnRtcGwuaHRtbCd9LFxuICAgICAgICAnX2JyYW5kcy13ZS1vZmZlckBob21lJzoge3RlbXBsYXRlVXJsOiAnYXBwL2hvbWUvX2JyYW5kcy13ZS1vZmZlci50bXBsLmh0bWwnfSxcbiAgICAgICAgJ19nZXQtc3RhcnRlZEBob21lJzoge3RlbXBsYXRlVXJsOiAnYXBwL2hvbWUvX2dldC1zdGFydGVkLnRtcGwuaHRtbCd9LFxuICAgICAgICAnX2Zvb3RlckBob21lJzoge3RlbXBsYXRlVXJsOiAnYXBwL2hvbWUvX2Zvb3Rlci50bXBsLmh0bWwnLCBjb250cm9sbGVyOiAnSG9tZUN0cmwnfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2F1dGgvbG9naW4udG1wbC5odG1sJ1xuICAgIH0pO1xufSk7XG4vLyBhbmd1bGFyLm1vZHVsZSgnVHJpcFRocmVhZHMnLCBbXSlcbiIsIid1c2Ugc3RyaWN0JztcbkZUVVhNb2R1bGUuY29udHJvbGxlcignTmV3SXRpbmVyYXJ5RlRVWEN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAkc2NvcGUuY2xpbWF0ZXMgPSBbJ1Ryb3BpY2FsJywgJ1JhaW55JywgJ1dpbnRlcnknXTtcbiAgJHNjb3BlLmRlc3RpbmF0aW9uID0ge307XG4gICRzY29wZS5kZXN0aW5hdGlvbi5jaXR5ID0gJyc7XG4gIC8vU3R5bGUgcHJvZmlsZVxuICAkc2NvcGUuc3R5bGVUeXBlcyA9IFsnQ2xhc3NpYycsICdHaXJseScsICdFZGd5JywgJ0Nhc3VhbCcsICdQcmVwcHknLCAnR2xhbW9yb3VzJywgJ1RyZW5kc2V0dGVyJywgJ0J1c2luZXNzJ107XG4gICRzY29wZS5wcmVmZXJyZWRDb2xvcnMgPSBbJyM3NTEyNDEnLCAnI2U4YjM3OScsICcjYTZhNmE2JywgJyNiMGM0ZDgnLCAnIzkzYWI4NScsICcjZGRiNmI0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2Y3MTk0NycsICcjMmZhNDU2JywgJyMwMDUyYTQnLCAnIzkwMDBjMycsICcjZDgwMDAwJywgJyNmNzc5MDYnLCAnI2ZmY2MwMCddO1xuICAkc2NvcGUucHJlZmVycmVkUGF0dGVybnMgPSBbJ0xhY2UnLCAnU3RyaXBlJywgJ1BvbGthIERvdCcsICdBbmltYWwnLCAnU29saWQnXTtcbiAgJHNjb3BlLnByZWZlcnJlZEJyYW5kcyA9IFsnQWxleGFuZGVyIE1jUXVlZW4nLCAnQ2hpYXJhIEZlcnJhZ25pJywgJ0NlbGluZSddO1xuICAkc2NvcGUuYWdlO1xuICAkc2NvcGUuYWRkaXRpb25hbEZhY3RzID0gWydJIGFtIGV4cGVjdGluZyBhIGxpdHRsZSBvbmUnLCAnSSBhbSBjdXJ2eSB3aXRoIGEgbG90IG1vcmUgdG8gbG92ZScsICdJIGxvdmUgYW5pbWFscywgbm90IHdlYXJpbmcgdGhlbSEnXVxuICBjb25zb2xlLmxvZyh0eXBlb2YgJHNjb3BlLmRlc3RpbmF0aW9uLmNpdHkpO1xufV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnVHJpcFRocmVhZHMnKS5jb250cm9sbGVyKCdIb21lQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICRzY29wZS5kYXRlWWVhciA9IG5ldyBEYXRlKCk7XG59XSk7XG4iLCIndXNlIHN0cmljdCc7XG5EYXNoYm9hcmRNb2R1bGUuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcbiAgICAgIHVybDogJy9kYXNoYm9hcmQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC50bXBsLmh0bWwnXG4gICAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vRlRVWCA9IFwiZmlyc3QgdGltZSB1c2VyIGV4cGVyaWVuY2VcIlxuRlRVWE1vZHVsZS5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnZ2V0LXN0YXJ0ZWQnLCB7XG4gICAgICB1cmw6ICcvZ2V0LXN0YXJ0ZWQnLFxuICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJyxcbiAgICAgIGFic3RyYWN0OnRydWUsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnbWFpbic6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9nZXQtc3RhcnRlZC9nZXQtc3RhcnRlZC50bXBsLmh0bWwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC8vU3R5bGUtcHJvZmlsZSBzcGVjaWZpYyBpbmZvcm1hdGlvbi5cbiAgICAvL1RoaXMgaXMgbW9yZSBvciBsZXNzIHBlcm1hbmVudGx5IHN0b3JlZCBpbmZvcm1hdGlvbiBsaW5rZWQgdG8gdGhlIGN1c3RvbWVyJ3Mgc3R5bGUgcHJvZmlsZVxuICAgIC5zdGF0ZSgnZ2V0LXN0YXJ0ZWQuc3R5bGUtdHlwZScsIHtcbiAgICAgIHVybDogJycsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnZ2V0LXN0YXJ0ZWQnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3R5bGUtcHJvZmlsZS9mdHV4L19zdHlsZS10eXBlLnRtcGwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkLnByZWZlcnJlZC1jb2xvcnMnLCB7XG4gICAgICB1cmw6ICcvcHJlZmVycmVkLWNvbG9ycycsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnZ2V0LXN0YXJ0ZWQnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3R5bGUtcHJvZmlsZS9mdHV4L19wcmVmZXJyZWQtY29sb3JzLnRtcGwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkLnByZWZlcnJlZC1wYXR0ZXJucycsIHtcbiAgICAgIHVybDogJy9wcmVmZXJyZWQtcGF0dGVybnMnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ2dldC1zdGFydGVkJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0eWxlLXByb2ZpbGUvZnR1eC9fcHJlZmVycmVkLXBhdHRlcm5zLnRtcGwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkLnByZWZlcnJlZC1icmFuZHMnLCB7XG4gICAgICB1cmw6ICcvcHJlZmVycmVkLWJyYW5kcycsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnZ2V0LXN0YXJ0ZWQnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvc3R5bGUtcHJvZmlsZS9mdHV4L19wcmVmZXJyZWQtYnJhbmRzLnRtcGwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkLmFnZScsIHtcbiAgICAgIHVybDogJy9hZ2UnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ2dldC1zdGFydGVkJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0eWxlLXByb2ZpbGUvZnR1eC9fYWdlLnRtcGwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkLmFkZGl0aW9uYWwtaW5mbycsIHtcbiAgICAgIHVybDogJy9hZGRpdGlvbmFsLWluZm8nLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ2dldC1zdGFydGVkJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0eWxlLXByb2ZpbGUvZnR1eC9fYWRkaXRpb25hbC1pbmZvLnRtcGwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAvL0l0aW5lcmFyeS1zcGVjaWZpYyBpbmZvcm1hdGlvbi4gVW5saWtlIHRoZSBhYm92ZSBzZWN0aW9uLCB0aGlzIHNlY3Rpb24gc3RvcmVzIGluZm9ybWF0aW9uIHNwZWNpZmljIHRvIHRoZSBjdXN0b21lcidzIGZpcnN0IGl0aW5lcmFyeS5cbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkLmRlc3RpbmF0aW9uJywge1xuICAgICAgdXJsOiAnL2Rlc3RpbmF0aW9uJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdnZXQtc3RhcnRlZCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9pdGluZXJhcnkvZnR1eC9fZGVzdGluYXRpb24udG1wbC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnTmV3SXRpbmVyYXJ5RlRVWEN0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2V0LXN0YXJ0ZWQuY2xpbWF0ZScsIHtcbiAgICAgIHVybDogJy9jbGltYXRlJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdnZXQtc3RhcnRlZCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9pdGluZXJhcnkvZnR1eC9fY2xpbWF0ZS50bXBsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdOZXdJdGluZXJhcnlGVFVYQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xufSlcbiIsIid1c2Ugc3RyaWN0JztcbkF1dGhNb2R1bGUuY29udHJvbGxlcignTG9naW5DdHJsJywgWyckc2NvcGUnLCAnQXV0aEZhY3QnLCAnJHN0YXRlJywgJyRjb29raWVzJywgZnVuY3Rpb24oJHNjb3BlLCBBdXRoRmFjdCwgJHN0YXRlLCAkY29va2llcykge1xuICAvL0F1dGhlbnRpY2F0ZSBhIHVzZXIgYW5kIHJlY2VpdmUgYSB0b2tlbiBpZiB1c2VyIGlzIHZhbGlkXG4gICRzY29wZS5zdWJtaXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uKCkge1xuICAgIEF1dGhGYWN0LmF1dGhlbnRpY2F0ZVVzZXIoJHNjb3BlLmVtYWlsLCAkc2NvcGUucGFzc3dvcmQpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoQXV0aEZhY3Quc3RhdHVzID09PSAyMDEpIHtcbiAgICAgICAgLy9TdG9yZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICRjb29raWVzLnB1dCgndHJpcHRocmVhZHNBdXRoVG9rZW4nLCBBdXRoRmFjdC50b2tlbik7XG4gICAgICAgIC8vUmVkaXJlY3QgdG8gL2Rhc2hib2FyZFxuICAgICAgICAkc3RhdGUuZ28oJ2Rhc2hib2FyZCcpO1xuICAgICAgfVxuICAgICAgLy9pZiB1bmF1dGhvcml6ZWRcbiAgICAgIGVsc2UgaWYgKEF1dGhGYWN0LnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgIGFsZXJ0KCdZb3UgZW50ZXJlZCBhbiBpbmNvcnJlY3QgZW1haWwvcGFzc3dvcmQgY29uZmlybWF0aW9uLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFsZXJ0KCdUaGVyZSB3YXMgYW4gZXJyb3IgY29tbXVuaWNhdGluZyB3aXRoIHRoZSBzZXJ2ZXIuIFBsZWFzZSB0cnkgYWdhaW4gYW5kIGNvbnRhY3QgY3VzdG9tZXIgc2VydmljZSBpZiB0aGUgaXNzdWUgcGVyc2lzdHMhIChFcnJvciBjb2RlOiAxSCknKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vVW5zdWNjZXNzZnVsIGV2ZW50IHJlc3BvbnNlXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICAvL0lmIHNvbWUgb3RoZXIgZXJyb3IgaGFwcGVuZWQgZW4gcm91dGUgdG8gdGhlIHNlcnZlclxuICAgICAgYWxlcnQoJ1RoZXJlIHdhcyBhbiBlcnJvciBjb21tdW5pY2F0aW5nIHdpdGggdGhlIHNlcnZlci4gUGxlYXNlIHRyeSBhZ2FpbiBhbmQgY29udGFjdCBjdXN0b21lciBzZXJ2aWNlIGlmIHRoZSBpc3N1ZSBwZXJzaXN0cyEgKEVycm9yIGNvZGU6IDFIKScpO1xuICAgIH0pO1xuICB9O1xufV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuQXV0aE1vZHVsZS5mYWN0b3J5KCdBdXRoRmFjdCcsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xuICB2YXIgQXV0aEZhY3QgPSB7fTtcbiAgdmFyIGF1dGhVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9zZXNzaW9ucyc7XG5cbiAgQXV0aEZhY3QuYXV0aGVudGljYXRlVXNlciA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgIHZhciBjcmVkZW50aWFscyA9IHt9OyBjcmVkZW50aWFscy5lbWFpbCA9IGVtYWlsOyBjcmVkZW50aWFscy5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgIHJldHVybiAkaHR0cC5wb3N0KGF1dGhVcmwsIGNyZWRlbnRpYWxzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDEpIHtcbiAgICAgICAgQXV0aEZhY3QudG9rZW4gPSByZXNwb25zZS5kYXRhLnRva2VuO1xuICAgICAgfVxuICAgICAgQXV0aEZhY3Quc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIH0sXG4gICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIEF1dGhGYWN0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBBdXRoRmFjdDtcbn1dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
