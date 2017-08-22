/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Text', [
    '$resource',
    Text
  ])
  function Text ($resource) {
    return $resource('http://api.icndb.com/jokes', {}, {
      update: { method: 'GET' }
    })
  }
})()
