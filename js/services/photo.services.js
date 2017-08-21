/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Photo', [
    '$resource',
    Photo
  ])
  function Photo ($resource) {
    return $resource('https://api.imgflip.com/get_memes', {}, {
      update: { method: 'GET' }
    })
  }
})()
