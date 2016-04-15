var angular = require('angular');
require('angular-route');
require('angular-ui-mask');
require('./xeditable');
require('jquery');
// require('moment');


angular
  .module('surfSup', [
    'ngRoute',
    'ui.mask',
    'xeditable'])

  .config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: "templates/homepage.html",
        controller: "UserController",
        resolve: {
          requestAmount: function ($q, FriendService) {
            var dfd = $q.defer();
          FriendService.requestAmt().then(function (amt) {
              dfd.resolve(amt);
            });
            return dfd.promise;
          }
        }
      })
      .when('/', {
        redirectTo: '/login'
      })
      .when('/login', {
        templateUrl: "templates/login.html",
        controller: "UserController"
      })
      .when('/create', {
        templateUrl: "templates/createUser.html",
        controller: "UserController"
      })
      .when('/addSession', {
        templateUrl: "templates/addSession.html",
        controller: "SessionController"
      })
      .when('/sessions', {
        templateUrl: "templates/sessions.html",
        controller: "SessionController"
      })
      .when('/friend', {
        templateUrl: "templates/friendsList.html",
        controller: "FriendController"
      })
      .when('/profile/:id/', {
        templateUrl: "templates/profilePage.html",
        controller: "ProfileController"
      });
  })
  .run (function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

require('./services/userService');
require('./services/sessionService');
require('./services/friendService');
require('./services/weatherService');
require('./services/cacheEngineService');
require('./controllers/userController');
require('./controllers/sessionController');
require('./controllers/friendController');
require('./controllers/navbar.controller');
require ('./directives/sessionDirective');
require ('./directives/friendAcceptDirective');
require('./controllers/profile.controller');
