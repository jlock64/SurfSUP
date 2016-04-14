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
        controller: "UserController"
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
  })
  .run (function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

require('./services/userService.js');
require('./services/sessionService.js');
require('./services/friendService.js');
require('./services/weatherService.js');
require('./services/cacheEngineService.js');
require('./controllers/userController.js');
require('./controllers/sessionController.js');
require('./controllers/friendController.js');
require ('./directives/sessionDirective.js');
require ('./directives/friendAcceptDirective.js');
