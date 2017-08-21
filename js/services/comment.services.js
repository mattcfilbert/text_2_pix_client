/* global angular */
(function () {
  angular
  .module('dankMemes')
  .factory('Comment', [
    '$resource',
    Comment
  ])
  function Comment ($resource) {
    return $resource('http://localhost:3000/comments/:id', {}, {
      update: { method: 'PUT' }
    })
  }
})()
