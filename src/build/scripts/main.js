'use strict';

var TriphThreadsApp = angular.module('TripThreads', [
  //Internal modules
  'AuthModule',
  'DashboardModule',
  //3rd Party modules
  'ui.router',
  'ngCookies'
]);

var AuthModule = angular.module('AuthModule', ['ui.router', 'ngCookies']);
var DashboardModule = angular.module('DashboardModule', ['ui.router']);

TriphThreadsApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        '': {templateUrl: 'app/home/home.tmpl.html'},
        '_what_is@home': {templateUrl: 'app/home/_what_is.tmpl.html'},
        '_how_it_works@home': {templateUrl: 'app/home/_how_it_works.tmpl.html'},
        '_brands_we_offer@home': {templateUrl: 'app/home/_brands_we_offer.tmpl.html'},
        '_get_started@home': {templateUrl: 'app/home/_get_started.tmpl.html'},
        '_footer@home': {templateUrl: 'app/home/_footer.tmpl.html', controller: 'HomeCtrl'}
      }
    })
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'app/auth/login.tmpl.html'
    })
    .state('getStarted', {
      url: '/get_started',
      controller: 'NewItineraryFTUXCtrl',
      templateUrl: 'app/get_started/get_started.tmpl.html'
    })
    .state('getStarted.destination', {
      url: '/destination',
      templateUrl: 'app/itinerary/ftux/_destination.tmpl.html'
    })
    .state('getStarted.climate', {
      url: '/climate',
      templateUrl: 'app/itinerary/ftux/_climate.tmpl.html'
    });
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
    },
    //Unsuccessful event response
    function() {
      //If some other error happened en route to the server
      alert('There was an error communicating with the server. Please try again and contact customer service if the issue persists! (Error code: 1H)');
    });
  };
}]);

'use strict';
angular.module('TripThreads').controller('NewItineraryFTUXCtrl', ['$scope', function($scope) {
  $scope.climates = ['Tropical', 'Rainy', 'Wintery'];
  $scope.destination = {};
  $scope.destination.city = '';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImF1dGgvYXV0aC5jdHJsLmpzIiwiZ2V0X3N0YXJ0ZWQvZ2V0X3N0YXJ0ZWQuY3RybC5qcyIsImhvbWUvaG9tZS5jdHJsLmpzIiwicm91dGluZy9kYXNoYm9hcmQtcm91dGVzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9hdXRoLmZhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHJpcGhUaHJlYWRzQXBwID0gYW5ndWxhci5tb2R1bGUoJ1RyaXBUaHJlYWRzJywgW1xuICAvL0ludGVybmFsIG1vZHVsZXNcbiAgJ0F1dGhNb2R1bGUnLFxuICAnRGFzaGJvYXJkTW9kdWxlJyxcbiAgLy8zcmQgUGFydHkgbW9kdWxlc1xuICAndWkucm91dGVyJyxcbiAgJ25nQ29va2llcydcbl0pO1xuXG52YXIgQXV0aE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdBdXRoTW9kdWxlJywgWyd1aS5yb3V0ZXInLCAnbmdDb29raWVzJ10pO1xudmFyIERhc2hib2FyZE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdEYXNoYm9hcmRNb2R1bGUnLCBbJ3VpLnJvdXRlciddKTtcblxuVHJpcGhUaHJlYWRzQXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9ob21lJyk7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICB1cmw6ICcvaG9tZScsXG4gICAgICB2aWV3czoge1xuICAgICAgICAnJzoge3RlbXBsYXRlVXJsOiAnYXBwL2hvbWUvaG9tZS50bXBsLmh0bWwnfSxcbiAgICAgICAgJ193aGF0X2lzQGhvbWUnOiB7dGVtcGxhdGVVcmw6ICdhcHAvaG9tZS9fd2hhdF9pcy50bXBsLmh0bWwnfSxcbiAgICAgICAgJ19ob3dfaXRfd29ya3NAaG9tZSc6IHt0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL19ob3dfaXRfd29ya3MudG1wbC5odG1sJ30sXG4gICAgICAgICdfYnJhbmRzX3dlX29mZmVyQGhvbWUnOiB7dGVtcGxhdGVVcmw6ICdhcHAvaG9tZS9fYnJhbmRzX3dlX29mZmVyLnRtcGwuaHRtbCd9LFxuICAgICAgICAnX2dldF9zdGFydGVkQGhvbWUnOiB7dGVtcGxhdGVVcmw6ICdhcHAvaG9tZS9fZ2V0X3N0YXJ0ZWQudG1wbC5odG1sJ30sXG4gICAgICAgICdfZm9vdGVyQGhvbWUnOiB7dGVtcGxhdGVVcmw6ICdhcHAvaG9tZS9fZm9vdGVyLnRtcGwuaHRtbCcsIGNvbnRyb2xsZXI6ICdIb21lQ3RybCd9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvYXV0aC9sb2dpbi50bXBsLmh0bWwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dldFN0YXJ0ZWQnLCB7XG4gICAgICB1cmw6ICcvZ2V0X3N0YXJ0ZWQnLFxuICAgICAgY29udHJvbGxlcjogJ05ld0l0aW5lcmFyeUZUVVhDdHJsJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2dldF9zdGFydGVkL2dldF9zdGFydGVkLnRtcGwuaHRtbCdcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2V0U3RhcnRlZC5kZXN0aW5hdGlvbicsIHtcbiAgICAgIHVybDogJy9kZXN0aW5hdGlvbicsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9pdGluZXJhcnkvZnR1eC9fZGVzdGluYXRpb24udG1wbC5odG1sJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdnZXRTdGFydGVkLmNsaW1hdGUnLCB7XG4gICAgICB1cmw6ICcvY2xpbWF0ZScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9pdGluZXJhcnkvZnR1eC9fY2xpbWF0ZS50bXBsLmh0bWwnXG4gICAgfSk7XG59KTtcbi8vIGFuZ3VsYXIubW9kdWxlKCdUcmlwVGhyZWFkcycsIFtdKVxuIiwiJ3VzZSBzdHJpY3QnO1xuQXV0aE1vZHVsZS5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBbJyRzY29wZScsICdBdXRoRmFjdCcsICckc3RhdGUnLCAnJGNvb2tpZXMnLCBmdW5jdGlvbigkc2NvcGUsIEF1dGhGYWN0LCAkc3RhdGUsICRjb29raWVzKSB7XG4gIC8vQXV0aGVudGljYXRlIGEgdXNlciBhbmQgcmVjZWl2ZSBhIHRva2VuIGlmIHVzZXIgaXMgdmFsaWRcbiAgJHNjb3BlLnN1Ym1pdENyZWRlbnRpYWxzID0gZnVuY3Rpb24oKSB7XG4gICAgQXV0aEZhY3QuYXV0aGVudGljYXRlVXNlcigkc2NvcGUuZW1haWwsICRzY29wZS5wYXNzd29yZCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGlmIChBdXRoRmFjdC5zdGF0dXMgPT09IDIwMSkge1xuICAgICAgICAvL1N0b3JlIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgJGNvb2tpZXMucHV0KCd0cmlwdGhyZWFkc0F1dGhUb2tlbicsIEF1dGhGYWN0LnRva2VuKTtcbiAgICAgICAgLy9SZWRpcmVjdCB0byAvZGFzaGJvYXJkXG4gICAgICAgICRzdGF0ZS5nbygnZGFzaGJvYXJkJyk7XG4gICAgICB9XG4gICAgICAvL2lmIHVuYXV0aG9yaXplZFxuICAgICAgZWxzZSBpZiAoQXV0aEZhY3Quc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgYWxlcnQoJ1lvdSBlbnRlcmVkIGFuIGluY29ycmVjdCBlbWFpbC9wYXNzd29yZCBjb25maXJtYXRpb24uIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvL1Vuc3VjY2Vzc2Z1bCBldmVudCByZXNwb25zZVxuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgLy9JZiBzb21lIG90aGVyIGVycm9yIGhhcHBlbmVkIGVuIHJvdXRlIHRvIHRoZSBzZXJ2ZXJcbiAgICAgIGFsZXJ0KCdUaGVyZSB3YXMgYW4gZXJyb3IgY29tbXVuaWNhdGluZyB3aXRoIHRoZSBzZXJ2ZXIuIFBsZWFzZSB0cnkgYWdhaW4gYW5kIGNvbnRhY3QgY3VzdG9tZXIgc2VydmljZSBpZiB0aGUgaXNzdWUgcGVyc2lzdHMhIChFcnJvciBjb2RlOiAxSCknKTtcbiAgICB9KTtcbiAgfTtcbn1dKTtcbiIsIid1c2Ugc3RyaWN0JztcbmFuZ3VsYXIubW9kdWxlKCdUcmlwVGhyZWFkcycpLmNvbnRyb2xsZXIoJ05ld0l0aW5lcmFyeUZUVVhDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgJHNjb3BlLmNsaW1hdGVzID0gWydUcm9waWNhbCcsICdSYWlueScsICdXaW50ZXJ5J107XG4gICRzY29wZS5kZXN0aW5hdGlvbiA9IHt9O1xuICAkc2NvcGUuZGVzdGluYXRpb24uY2l0eSA9ICcnO1xuICBjb25zb2xlLmxvZyh0eXBlb2YgJHNjb3BlLmRlc3RpbmF0aW9uLmNpdHkpO1xufV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnVHJpcFRocmVhZHMnKS5jb250cm9sbGVyKCdIb21lQ3RybCcsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICRzY29wZS5kYXRlWWVhciA9IG5ldyBEYXRlKCk7XG59XSk7XG4iLCIndXNlIHN0cmljdCc7XG5EYXNoYm9hcmRNb2R1bGUuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcbiAgICAgIHVybDogJy9kYXNoYm9hcmQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC50bXBsLmh0bWwnXG4gICAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbkF1dGhNb2R1bGUuZmFjdG9yeSgnQXV0aEZhY3QnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcbiAgdmFyIEF1dGhGYWN0ID0ge307XG4gIHZhciBhdXRoVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvc2Vzc2lvbnMnO1xuXG4gIEF1dGhGYWN0LmF1dGhlbnRpY2F0ZVVzZXIgPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICB2YXIgY3JlZGVudGlhbHMgPSB7fTsgY3JlZGVudGlhbHMuZW1haWwgPSBlbWFpbDsgY3JlZGVudGlhbHMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICByZXR1cm4gJGh0dHAucG9zdChhdXRoVXJsLCBjcmVkZW50aWFscykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAxKSB7XG4gICAgICAgIEF1dGhGYWN0LnRva2VuID0gcmVzcG9uc2UuZGF0YS50b2tlbjtcbiAgICAgIH1cbiAgICAgIEF1dGhGYWN0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICB9LFxuICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBBdXRoRmFjdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gQXV0aEZhY3Q7XG59XSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
