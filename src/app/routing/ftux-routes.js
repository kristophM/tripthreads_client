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
