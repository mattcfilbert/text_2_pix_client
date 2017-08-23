/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Cat', [
    '$resource',
    Cat
  ])
  function Cat ($resource) {
    return $resource('https://random.cat/meow', {}, {
      update: { method: 'PUT' }
    })
  }
})()
