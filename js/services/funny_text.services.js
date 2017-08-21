/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('funnyText', [
    '$resource',
    funnyText
  ])
  function funnyText ($resource) {
    return $resource('http://api.adviceslip.com/advice', {}, {
      update: {method: 'GET'}
    })
  }
})()
