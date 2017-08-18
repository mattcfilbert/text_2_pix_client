/* global angular */
(function () {
  angular
  .module('dankMemes')
  .controller('MemeIndexController', [
    '$state',
    'Meme',
    MemeIndexControllerFunction
  ])

  function MemeIndexControllerFunction ($state, Meme) {
    this.memes = Meme.query()
  }
})()
