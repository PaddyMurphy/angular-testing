var myApp = angular.module('tk-demo', []);

myApp.controller('tableController', ['$scope', function ($scope){
  $scope.rows = [
    {name: 'Paul', value: 100.01},
    {name: 'John', value: ''},
    {name: 'Lucie', value: 12345678},
    {name: 'Matthew', value: -4}
  ];
}]);

  myApp.filter('shortNumber', function() {
  });