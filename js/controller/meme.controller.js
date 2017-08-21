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
    'Photo',
    MemeShowControllerFunction
  ])
  function MemeIndexControllerFunction ($state, Meme, Photo) {
    this.memes = Meme.query()
    this.photo = Photo.get()
    this.createPhoto = Photo.get()
    this.newMeme = new Meme()

    this.create = function () {
      this.randomPhotoUrl = this.createPhoto.images[Math.floor(Math.random() * this.createPhoto.images.length)].url
      this.newMeme.img_url = this.randomPhotoUrl
      this.newMeme.$save((newMeme) => {
        $state.go('memeShow', {id: newMeme.id})
      })
    }
  }
  function MemeShowControllerFunction ($window, $state, $stateParams, Meme, Comment, Photo) {
    this.meme = Meme.get({ id: $stateParams.id })
    this.meme.comments = Meme.get({ id: $stateParams.id }).comments
    this.newComment = new Comment()

    this.photo = Photo.get()
    this.createComment = function () {
      this.newComment.meme_id = this.meme.id
      this.newComment.$save(() => {
        $window.location.reload()
      })
    }

    this.editComment = function () {
      console.log(this.meme.comments.length)
      console.log(this.meme.comments[0].id)
      for (var i = 0; i < this.meme.comments.length; i++) {
        this.meme.comments[i].$update({id: this.meme.comments[i].id})
      }
    }

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
    this.newPhoto = function () {
      this.randomPhotoUrl = this.photo.data.memes[Math.floor(Math.random() * this.photo.data.memes.length)].url
      this.meme.img_url = this.randomPhotoUrl
      this.meme.$update({ id: $state.params.id })
      $window.location.reload()
    }
  }
})()
