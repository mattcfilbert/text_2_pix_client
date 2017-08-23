/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Meme', [
    '$resource',
    Meme
  ])
  function Meme ($resource) {
    return $resource('https://meme-gen-api.herokuapp.com/memes/:id', {}, {
      update: { method: 'PUT' }
    })
  }
})()
