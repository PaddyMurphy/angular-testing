var myApp = angular.module('tk-demo', []);

myApp.controller('tableController', ['$scope', function ($scope){
  $scope.sortField = 'value'
  $scope.sort = 'asc'
  $scope.rowsSanitized = []
  $scope.rows = [
    {name: 'Paul', value: 100.01},
    {name: 'John', value: ''},
    {name: 'Lucie', value: 12345678},
    {name: 'Patrick', value: 1234567},
    {name: 'Trump', value: 3534567890},
    {name: 'Elon', value: 9534567890000},
    {name: 'Gary', value: 123456},
    {name: 'Leslie', value: 12345},
    {name: 'Matthew', value: -4}
  ];

  $scope.rows.forEach(function(d) {
    var val = d.value;

    if (typeof (d.value) !== 'number' || (d.value <= 0)) {
      val = 0;
    }

    $scope.rowsSanitized.push({'name': d.name, 'value': val})
  })
}]);

/*
Implement the 'shortNumber' AngularJs filter which is applied
to the Values column. This filter should do the following:

  a. numbers greater than a thousand, but less than a million should be
     abbreviated to the number of thousands with two decimal places and
     given the suffix of 'K' (i.e. 4,300 should become 4.30K)

  b. numbers greater than a million, but less than a billion should be
     abbreviated to the number of millions with two decimal places and
     given the suffix of 'Mil' (i.e. 4,356,000 should become 4.36Mil)

  c. non-numbers AND numbers less <= 0 should be displayed as '-'

  Bonus challenge:

  Add ascending and descending sorting to this Values column.
  Clicking the column header should turn the sorting on and
  toggle the asc/desc direction. The sorting function should
  view non-numbers the same as zero.

*/

// decimal rounding
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
function round (number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
}

myApp.filter('shortNumber', function() {
  // Create the return function and set the required parameter name to **input**
  return function(input) {
    var out = input;
    var suffixes = ['', 'K', 'Mil', 'Bil', 'Tril']
    var length = Math.floor(input).toString().length;
    // determine which suffix belongs
    var suffixPos = Math.floor(length / 3 );
    // abbreviate length
    var reduced = input / Math.pow(1000, suffixPos);

    // return non-numbers AND numbers less <= 0 as '-'
    if (typeof (input) !== 'number' || (input <= 0)) {
      return '-';
    }

    // return numbers less than 1000
    if (length < 5) {
      return round(input, 2)
    }

    // return numbers greater than 1000 with suffix
    return round(reduced, 2) + ' ' + suffixes[suffixPos];
  }
});