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

    this.newMeme = new Meme()

    this.create = function () {
      this.newMeme.$save((newMeme) => {
        $state.go('memeShow', {id: newMeme.id})
      })
    }
  }
  function MemeShowControllerFunction ($stateParams, Meme) {
    this.meme = Meme.get({ id: $stateParams.id })
  }
})()
