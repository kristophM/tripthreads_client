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
