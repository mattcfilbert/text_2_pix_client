/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Meme', [
    '$resource',
    Meme
  ])
  function Meme ($resource) {
    return $resource('http://localhost:3000/memes/:id', {}, {
      update: { method: 'PUT' }
    })
  }
})()
