/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Meme', [
    '$resource',
    Meme
  ])
  .factory('Photo', [
    '$resource',
    Photo
  ])
  function Meme ($resource) {
    return $resource('http://localhost:3000/memes/:id', {}, {
      update: { method: 'PUT' }
    })
  }
  function Photo ($resource) {
    return $resource('http://www.splashbase.co/api/v1/images/random?images_only=true', {}, {
      update: { method: 'GET' }
    })
  }
})()
