angular
  .module('surfSup')
  .controller('UserController', function($scope, $location, UserService, $rootScope, WeatherService) {
    $location.path() === "/login" || $location.path() === "/create" ? $rootScope.showBar = false : $rootScope.showBar = true;
    $scope.loginObj = {
      username: '',
      password: ''
    };
    $scope.login = login;
    $scope.logout = logout;
    $scope.acctObj = {};
    $scope.submitForm = submitForm;
    $scope.getWeatherData = getWeatherData;


    function login() {
      console.log('login object:', $scope.loginObj);
      UserService.loginUser($scope.loginObj).success(function (res) {
        console.log('we can redirect here if so', res);
        $location.path('/home');
      })
      .error(function (err) {
        console.log('doh');
        $('#userNameAlert').html('<div class="alert alert-danger" role="alert"><strong>Oh no!</strong> The username and password do not match. Try again.</div>');
      });
    }

    function logout() {
      UserService.logoutUser();
      console.log('logging out');
      $location.path('/login');
    }

    function submitForm() {
      console.log('account object:', $scope.acctObj);
      UserService.addAcct($scope.acctObj).success(function(res){
        console.log('create works');
        $location.path('/home');
      })
      .error (function (err) {
        console.log('create not working');
      });
    }

    function getWeatherData() {
      console.log('in getWeatherData function');
      WeatherService.getWeather()
        .then(function(data) {
          console.log(data);
          window.glob = data.data;
          $scope.weatherData = data.data;
        })
    }
    getWeatherData();


  }); // end of LoginController
