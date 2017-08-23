/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Comment', [
    '$resource',
    Comment
  ])
  function Comment ($resource) {
    return $resource('https://meme-gen-api.herokuapp.com/comments/:id', {}, {
      update: { method: 'PUT' }
    })
  }
})()
