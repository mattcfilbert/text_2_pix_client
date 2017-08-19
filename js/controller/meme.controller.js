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
    GrumbleShowControllerFunction
  ])
  function MemeIndexControllerFunction ($state, Meme) {
    this.memes = Meme.query()
  }
  function GrumbleShowControllerFunction ($stateParams, Meme) {
    this.meme = Meme.get({ id: $stateParams.id })
  }
})()
