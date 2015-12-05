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
