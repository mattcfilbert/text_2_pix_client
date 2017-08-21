/* global angular */
(function () {
  angular
  .module('dankMemes')
  .controller('MemeIndexController', [
    '$state',
    'Meme',
    'Photo',
    MemeIndexControllerFunction
  ])
  .controller('MemeShowController', [
    '$window',
    '$state',
    '$stateParams',
    'Meme',
    'Comment',
    MemeShowControllerFunction
  ])
  function MemeIndexControllerFunction ($state, Meme, Photo) {
    this.memes = Meme.query()
    this.photo = Photo.get()
    this.newMeme = new Meme()

    this.create = function () {
      this.newMeme.img_url = this.photo.url
      this.newMeme.$save((newMeme) => {
        $state.go('memeShow', {id: newMeme.id})
      })
    }
  }
  function MemeShowControllerFunction ($window, $state, $stateParams, Meme, Comment) {
    this.meme = Meme.get({ id: $stateParams.id })
    this.newComment = new Comment()

    this.createComment = function () {
      this.newComment.$save((newComment) => {
        $window.location.reload()
      })
    }
    // console.log(this.newComment)
    this.edit = function () {
      this.meme.$update({ id: $state.params.id }, () => {
        $window.location.reload()
      })
    }
    this.delete = function () {
      this.meme.$delete({ id: $state.params.id }, () => {
        $state.go('memeIndex')
      })
    }
  }
})()
