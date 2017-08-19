/* global angular */
(function () {
  angular
  .module('dankMemes')
  .controller('MemeIndexController', [
    '$state',
    'Meme',
    MemeIndexControllerFunction
  ])
  .controller('MemeShowController', [
    '$stateParams',
    'Meme',
    MemeShowControllerFunction
  ])
  function MemeIndexControllerFunction ($state, Meme) {
    this.memes = Meme.query()
  }
  function MemeShowControllerFunction ($stateParams, Meme) {
    this.meme = Meme.get({ id: $stateParams.id })
  }
})()
