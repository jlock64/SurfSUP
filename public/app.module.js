var angular = require('angular');
var angularRoute = require('angular-route');
var uiMask = require('angular-ui-mask');
<<<<<<< HEAD
IScroll = require('iscroll');
var $ = require('jquery');
var drawer = require('jquery-drawer');
=======
// var xeditable = require('angular-xeditable');
>>>>>>> 76de36f9502aaa284cc81eb3b5e32ee034ebe1cb

angular
  .module('surfSup', ['ngRoute', uiMask])
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
//   .run (function(editableOptions) {
//   editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
// });
require('./services/userService.js');
require('./services/sessionService.js');
// require('./services/WeatherService.js');
require('./services/cacheEngineService.js');
require('./controllers/UserController.js');
require('./controllers/SessionController.js');
require ('./directives/sessionDirective.js');
