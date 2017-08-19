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
    '$window',
    '$state',
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
  function MemeShowControllerFunction ($window, $state, $stateParams, Meme) {
    this.meme = Meme.get({ id: $stateParams.id })

    this.edit = function () {
      this.meme.$update({ id: $state.params.id }, () => {
        $window.location.reload()
      })
    }
    this.delete = function () {
      this.meme.$delete({ id: $state.params.id }, (meme) => {
        $state.go('memeIndex')
      })
    }
  }
})()
