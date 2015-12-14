'use strict';

var TriphThreadsApp = angular.module('TripThreads', [
  //Internal modules
  'AuthModule',
  'DashboardModule',
  'FTUXModule',
  'ngMaterial',
  //3rd Party modules
  'ui.router',
  'ngCookies'
]);

var AuthModule = angular.module('AuthModule', ['ui.router', 'ngCookies']);
var DashboardModule = angular.module('DashboardModule', ['ui.router']);
var FTUXModule = angular.module('FTUXModule', ['ui.router']);

TriphThreadsApp.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
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

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue-grey')
      .warnPalette('orange')
});
// angular.module('TripThreads', [])

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImF1dGgvYXV0aC5jdHJsLmpzIiwiZ2V0LXN0YXJ0ZWQvZ2V0LXN0YXJ0ZWQuY3RybC5qcyIsImhvbWUvaG9tZS5jdHJsLmpzIiwicm91dGluZy9kYXNoYm9hcmQtcm91dGVzLmpzIiwicm91dGluZy9mdHV4LXJvdXRlcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvYXV0aC5mYWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFRyaXBoVGhyZWFkc0FwcCA9IGFuZ3VsYXIubW9kdWxlKCdUcmlwVGhyZWFkcycsIFtcbiAgLy9JbnRlcm5hbCBtb2R1bGVzXG4gICdBdXRoTW9kdWxlJyxcbiAgJ0Rhc2hib2FyZE1vZHVsZScsXG4gICdGVFVYTW9kdWxlJyxcbiAgJ25nTWF0ZXJpYWwnLFxuICAvLzNyZCBQYXJ0eSBtb2R1bGVzXG4gICd1aS5yb3V0ZXInLFxuICAnbmdDb29raWVzJ1xuXSk7XG5cbnZhciBBdXRoTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ0F1dGhNb2R1bGUnLCBbJ3VpLnJvdXRlcicsICduZ0Nvb2tpZXMnXSk7XG52YXIgRGFzaGJvYXJkTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ0Rhc2hib2FyZE1vZHVsZScsIFsndWkucm91dGVyJ10pO1xudmFyIEZUVVhNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnRlRVWE1vZHVsZScsIFsndWkucm91dGVyJ10pO1xuXG5UcmlwaFRocmVhZHNBcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikge1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvaG9tZScpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgdXJsOiAnL2hvbWUnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ21haW4nOiB7dGVtcGxhdGVVcmw6ICdhcHAvaG9tZS9ob21lLnRtcGwuaHRtbCd9LFxuICAgICAgICAnX3doYXQtaXNAaG9tZSc6IHt0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL193aGF0LWlzLnRtcGwuaHRtbCd9LFxuICAgICAgICAnX2hvdy1pdC13b3Jrc0Bob21lJzoge3RlbXBsYXRlVXJsOiAnYXBwL2hvbWUvX2hvdy1pdC13b3Jrcy50bXBsLmh0bWwnfSxcbiAgICAgICAgJ19icmFuZHMtd2Utb2ZmZXJAaG9tZSc6IHt0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL19icmFuZHMtd2Utb2ZmZXIudG1wbC5odG1sJ30sXG4gICAgICAgICdfZ2V0LXN0YXJ0ZWRAaG9tZSc6IHt0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL19nZXQtc3RhcnRlZC50bXBsLmh0bWwnfSxcbiAgICAgICAgJ19mb290ZXJAaG9tZSc6IHt0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL19mb290ZXIudG1wbC5odG1sJywgY29udHJvbGxlcjogJ0hvbWVDdHJsJ31cbiAgICAgIH1cbiAgICB9KVxuICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9hdXRoL2xvZ2luLnRtcGwuaHRtbCdcbiAgICB9KTtcblxuICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXG4gICAgICAucHJpbWFyeVBhbGV0dGUoJ2JsdWUnKVxuICAgICAgLmFjY2VudFBhbGV0dGUoJ2JsdWUtZ3JleScpXG4gICAgICAud2FyblBhbGV0dGUoJ29yYW5nZScpXG59KTtcbi8vIGFuZ3VsYXIubW9kdWxlKCdUcmlwVGhyZWFkcycsIFtdKVxuIiwiJ3VzZSBzdHJpY3QnO1xuQXV0aE1vZHVsZS5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBbJyRzY29wZScsICdBdXRoRmFjdCcsICckc3RhdGUnLCAnJGNvb2tpZXMnLCBmdW5jdGlvbigkc2NvcGUsIEF1dGhGYWN0LCAkc3RhdGUsICRjb29raWVzKSB7XG4gIC8vQXV0aGVudGljYXRlIGEgdXNlciBhbmQgcmVjZWl2ZSBhIHRva2VuIGlmIHVzZXIgaXMgdmFsaWRcbiAgJHNjb3BlLnN1Ym1pdENyZWRlbnRpYWxzID0gZnVuY3Rpb24oKSB7XG4gICAgQXV0aEZhY3QuYXV0aGVudGljYXRlVXNlcigkc2NvcGUuZW1haWwsICRzY29wZS5wYXNzd29yZCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGlmIChBdXRoRmFjdC5zdGF0dXMgPT09IDIwMSkge1xuICAgICAgICAvL1N0b3JlIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgJGNvb2tpZXMucHV0KCd0cmlwdGhyZWFkc0F1dGhUb2tlbicsIEF1dGhGYWN0LnRva2VuKTtcbiAgICAgICAgLy9SZWRpcmVjdCB0byAvZGFzaGJvYXJkXG4gICAgICAgICRzdGF0ZS5nbygnZGFzaGJvYXJkJyk7XG4gICAgICB9XG4gICAgICAvL2lmIHVuYXV0aG9yaXplZFxuICAgICAgZWxzZSBpZiAoQXV0aEZhY3Quc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgYWxlcnQoJ1lvdSBlbnRlcmVkIGFuIGluY29ycmVjdCBlbWFpbC9wYXNzd29yZCBjb25maXJtYXRpb24uIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWxlcnQoJ1RoZXJlIHdhcyBhbiBlcnJvciBjb21tdW5pY2F0aW5nIHdpdGggdGhlIHNlcnZlci4gUGxlYXNlIHRyeSBhZ2FpbiBhbmQgY29udGFjdCBjdXN0b21lciBzZXJ2aWNlIGlmIHRoZSBpc3N1ZSBwZXJzaXN0cyEgKEVycm9yIGNvZGU6IDFIKScpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy9VbnN1Y2Nlc3NmdWwgZXZlbnQgcmVzcG9uc2VcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIC8vSWYgc29tZSBvdGhlciBlcnJvciBoYXBwZW5lZCBlbiByb3V0ZSB0byB0aGUgc2VydmVyXG4gICAgICBhbGVydCgnVGhlcmUgd2FzIGFuIGVycm9yIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgc2VydmVyLiBQbGVhc2UgdHJ5IGFnYWluIGFuZCBjb250YWN0IGN1c3RvbWVyIHNlcnZpY2UgaWYgdGhlIGlzc3VlIHBlcnNpc3RzISAoRXJyb3IgY29kZTogMUgpJyk7XG4gICAgfSk7XG4gIH07XG59XSk7XG4iLCIndXNlIHN0cmljdCc7XG5GVFVYTW9kdWxlLmNvbnRyb2xsZXIoJ05ld0l0aW5lcmFyeUZUVVhDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgJHNjb3BlLmNsaW1hdGVzID0gWydUcm9waWNhbCcsICdSYWlueScsICdXaW50ZXJ5J107XG4gICRzY29wZS5kZXN0aW5hdGlvbiA9IHt9O1xuICAkc2NvcGUuZGVzdGluYXRpb24uY2l0eSA9ICcnO1xuICAvL1N0eWxlIHByb2ZpbGVcbiAgJHNjb3BlLmF2YWlsYWJsZVN0eWxlVHlwZXMgPSBbJ0NsYXNzaWMnLCAnR2lybHknLCAnRWRneScsICdDYXN1YWwnLCAnUHJlcHB5JywgJ0dsYW1vcm91cycsICdUcmVuZHNldHRlcicsICdCdXNpbmVzcyddO1xuICAkc2NvcGUucHJlZmVycmVkQ29sb3JzID0gWycjNzUxMjQxJywgJyNlOGIzNzknLCAnI2E2YTZhNicsICcjYjBjNGQ4JywgJyM5M2FiODUnLCAnI2RkYjZiNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNmNzE5NDcnLCAnIzJmYTQ1NicsICcjMDA1MmE0JywgJyM5MDAwYzMnLCAnI2Q4MDAwMCcsICcjZjc3OTA2JywgJyNmZmNjMDAnXTtcbiAgJHNjb3BlLnByZWZlcnJlZFBhdHRlcm5zID0gWydMYWNlJywgJ1N0cmlwZScsICdQb2xrYSBEb3QnLCAnQW5pbWFsJywgJ1NvbGlkJ107XG4gICRzY29wZS5wcmVmZXJyZWRCcmFuZHMgPSBbJ0FsZXhhbmRlciBNY1F1ZWVuJywgJ0NoaWFyYSBGZXJyYWduaScsICdDZWxpbmUnXTtcbiAgJHNjb3BlLmFnZTtcbiAgJHNjb3BlLmFkZGl0aW9uYWxGYWN0cyA9IFsnSSBhbSBleHBlY3RpbmcgYSBsaXR0bGUgb25lJywgJ0kgYW0gY3Vydnkgd2l0aCBhIGxvdCBtb3JlIHRvIGxvdmUnLCAnSSBsb3ZlIGFuaW1hbHMsIG5vdCB3ZWFyaW5nIHRoZW0hJ11cbiAgY29uc29sZS5sb2codHlwZW9mICRzY29wZS5kZXN0aW5hdGlvbi5jaXR5KTtcbn1dKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ1RyaXBUaHJlYWRzJykuY29udHJvbGxlcignSG9tZUN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAkc2NvcGUuZGF0ZVllYXIgPSBuZXcgRGF0ZSgpO1xufV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuRGFzaGJvYXJkTW9kdWxlLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdkYXNoYm9hcmQnLCB7XG4gICAgICB1cmw6ICcvZGFzaGJvYXJkJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQudG1wbC5odG1sJ1xuICAgIH0pO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vL0ZUVVggPSBcImZpcnN0IHRpbWUgdXNlciBleHBlcmllbmNlXCJcbkZUVVhNb2R1bGUuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkJywge1xuICAgICAgdXJsOiAnL2dldC1zdGFydGVkJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdOZXdJdGluZXJhcnlGVFVYQ3RybCcsXG4gICAgICBhYnN0cmFjdDp0cnVlLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ21haW4nOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZ2V0LXN0YXJ0ZWQvZ2V0LXN0YXJ0ZWQudG1wbC5odG1sJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAvL1N0eWxlLXByb2ZpbGUgc3BlY2lmaWMgaW5mb3JtYXRpb24uXG4gICAgLy9UaGlzIGlzIG1vcmUgb3IgbGVzcyBwZXJtYW5lbnRseSBzdG9yZWQgaW5mb3JtYXRpb24gbGlua2VkIHRvIHRoZSBjdXN0b21lcidzIHN0eWxlIHByb2ZpbGVcbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkLnN0eWxlLXR5cGUnLCB7XG4gICAgICB1cmw6ICcnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ2dldC1zdGFydGVkJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0eWxlLXByb2ZpbGUvZnR1eC9fc3R5bGUtdHlwZS50bXBsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdOZXdJdGluZXJhcnlGVFVYQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdnZXQtc3RhcnRlZC5wcmVmZXJyZWQtY29sb3JzJywge1xuICAgICAgdXJsOiAnL3ByZWZlcnJlZC1jb2xvcnMnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ2dldC1zdGFydGVkJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0eWxlLXByb2ZpbGUvZnR1eC9fcHJlZmVycmVkLWNvbG9ycy50bXBsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdOZXdJdGluZXJhcnlGVFVYQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdnZXQtc3RhcnRlZC5wcmVmZXJyZWQtcGF0dGVybnMnLCB7XG4gICAgICB1cmw6ICcvcHJlZmVycmVkLXBhdHRlcm5zJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdnZXQtc3RhcnRlZCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdHlsZS1wcm9maWxlL2Z0dXgvX3ByZWZlcnJlZC1wYXR0ZXJucy50bXBsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdOZXdJdGluZXJhcnlGVFVYQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdnZXQtc3RhcnRlZC5wcmVmZXJyZWQtYnJhbmRzJywge1xuICAgICAgdXJsOiAnL3ByZWZlcnJlZC1icmFuZHMnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ2dldC1zdGFydGVkJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL3N0eWxlLXByb2ZpbGUvZnR1eC9fcHJlZmVycmVkLWJyYW5kcy50bXBsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdOZXdJdGluZXJhcnlGVFVYQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdnZXQtc3RhcnRlZC5hZ2UnLCB7XG4gICAgICB1cmw6ICcvYWdlJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdnZXQtc3RhcnRlZCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdHlsZS1wcm9maWxlL2Z0dXgvX2FnZS50bXBsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdOZXdJdGluZXJhcnlGVFVYQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdnZXQtc3RhcnRlZC5hZGRpdGlvbmFsLWluZm8nLCB7XG4gICAgICB1cmw6ICcvYWRkaXRpb25hbC1pbmZvJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICdnZXQtc3RhcnRlZCc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9zdHlsZS1wcm9maWxlL2Z0dXgvX2FkZGl0aW9uYWwtaW5mby50bXBsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdOZXdJdGluZXJhcnlGVFVYQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLy9JdGluZXJhcnktc3BlY2lmaWMgaW5mb3JtYXRpb24uIFVubGlrZSB0aGUgYWJvdmUgc2VjdGlvbiwgdGhpcyBzZWN0aW9uIHN0b3JlcyBpbmZvcm1hdGlvbiBzcGVjaWZpYyB0byB0aGUgY3VzdG9tZXIncyBmaXJzdCBpdGluZXJhcnkuXG4gICAgLnN0YXRlKCdnZXQtc3RhcnRlZC5kZXN0aW5hdGlvbicsIHtcbiAgICAgIHVybDogJy9kZXN0aW5hdGlvbicsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnZ2V0LXN0YXJ0ZWQnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaXRpbmVyYXJ5L2Z0dXgvX2Rlc3RpbmF0aW9uLnRtcGwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2dldC1zdGFydGVkLmNsaW1hdGUnLCB7XG4gICAgICB1cmw6ICcvY2xpbWF0ZScsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnZ2V0LXN0YXJ0ZWQnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaXRpbmVyYXJ5L2Z0dXgvX2NsaW1hdGUudG1wbC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnTmV3SXRpbmVyYXJ5RlRVWEN0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbn0pXG4iLCIndXNlIHN0cmljdCc7XG5BdXRoTW9kdWxlLmZhY3RvcnkoJ0F1dGhGYWN0JywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XG4gIHZhciBBdXRoRmFjdCA9IHt9O1xuICB2YXIgYXV0aFVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3Nlc3Npb25zJztcblxuICBBdXRoRmFjdC5hdXRoZW50aWNhdGVVc2VyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgdmFyIGNyZWRlbnRpYWxzID0ge307IGNyZWRlbnRpYWxzLmVtYWlsID0gZW1haWw7IGNyZWRlbnRpYWxzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoYXV0aFVybCwgY3JlZGVudGlhbHMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMSkge1xuICAgICAgICBBdXRoRmFjdC50b2tlbiA9IHJlc3BvbnNlLmRhdGEudG9rZW47XG4gICAgICB9XG4gICAgICBBdXRoRmFjdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgfSxcbiAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgQXV0aEZhY3Quc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIEF1dGhGYWN0O1xufV0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
