/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Text', [
    '$resource',
    Text
  ])
  function Text ($resource) {
    return $resource('https://icanhazdadjoke.com/slack', {}, {
      update: { method: 'GET' }
    })
  }
})()
