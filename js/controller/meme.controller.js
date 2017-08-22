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
    'Text',
    'Cat',
    MemeShowControllerFunction
  ])
  function MemeIndexControllerFunction ($state, Meme, Photo) {
    this.memes = Meme.query()
    this.photo = Photo.get()
    this.createPhoto = Photo.get()
    this.newMeme = new Meme()

    this.create = function () {
      this.randomPhotoUrl = this.createPhoto.data.memes[Math.floor(Math.random() * this.createPhoto.data.memes.length)].url
      this.newMeme.img_url = this.randomPhotoUrl
      this.newMeme.$save((newMeme) => {
        $state.go('memeShow', {id: newMeme.id})
      })
    }
  }
  function MemeShowControllerFunction ($window, $state, $stateParams, Meme, Comment, Photo, Text, Cat) {
    this.meme = Meme.get({ id: $stateParams.id })
    this.meme.comments = Meme.get({ id: $stateParams.id }).comments
    this.newComment = new Comment()
    this.funnyText = Text.get()
    this.photo = Photo.get()
    this.newCat = Cat.get()

    this.createComment = function () {
      this.newComment.meme_id = this.meme.id
      this.newComment.$save(() => {
        $window.location.reload()
      })
    }

    this.editComment = function (comId) {
      const comment = this.meme.comments.find(function (comment) {
        return comment.id === comId
      })
      Comment.update({id: comId}, comment)
    }

    this.deleteComment = function (comId) {
      const comment = this.meme.comments.find(function (comment) {
        return comment.id === comId
      })
      Comment.destroy({id: comId}, comment)
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
      console.log(this.photo.data)
      this.meme.img_url = this.randomPhotoUrl
      this.meme.$update({ id: $state.params.id })
      // $window.location.reload()
    }
    this.newText = function () {
      console.log(this.funnyText.attachments[0].fallback)
      this.newText = this.funnyText.attachments[Math.floor(Math.random() * this.funnyText.attachments.length)].fallback
      this.meme.text = this.newText
      this.meme.$update({ id: $state.params.id })
      $window.location.reload()
    }
    this.catPicture = function () {
      this.meme.img_url = this.newCat.file
      console.log(this.newCat.file)
      this.meme.$update({ id: $state.params.id })

      $window.location.reload()
    }
    this.dropPhoto = function () {
      this.meme.img_url = this.dropDownPhoto.url
    }
  }
})()
