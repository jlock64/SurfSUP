var angular = require('angular');
<<<<<<< HEAD
var angularRoute = require('angular-route');
var uiMask = require('angular-ui-mask');
var $ = require('jquery');
var xeditable = require('angular-xeditable');

angular
  .module('surfSup', ['ngRoute', 'uiMask', 'xeditable'])
=======
require('angular-route');
require('angular-ui-mask');
require('./xeditable');
require('jquery');


angular
  .module('surfSup', [
    'ngRoute',
    'ui.mask',
    'xeditable'])
>>>>>>> 225e942af56bb1c8deec1cf02ec449615833dbe4
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
      });
  })
  .run (function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
<<<<<<< HEAD
  });
=======
});
>>>>>>> 225e942af56bb1c8deec1cf02ec449615833dbe4
require('./services/userService.js');
require('./services/sessionService.js');
// require('./services/WeatherService.js');
require('./services/cacheEngineService.js');
require('./controllers/UserController.js');
require('./controllers/SessionController.js');
require ('./directives/sessionDirective.js');
