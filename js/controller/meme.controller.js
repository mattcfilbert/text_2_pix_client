/* global angular */
(function () {
  angular
  .module('dankMemes')
  .controller('MemeIndexController', [
    '$state',
    'Meme',
    'Photo',
    '$window',
    'Text',
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
  function MemeIndexControllerFunction ($state, Meme, Photo, $window, Text) {
    this.memes = Meme.query()
    this.photo = Photo.get()
    this.createPhoto = Photo.get()
    this.newMeme = new Meme()
    this.funnyText = Text.get()
    this.yourMemes = window.sessionStorage.getItem('savedMemes') || []
    if (this.yourMemes === window.sessionStorage.getItem('savedMemes')) {
      this.yourMemes = JSON.parse(window.sessionStorage.getItem('savedMemes'))
    }

    this.addMeme = function (newMeme) {
      var existingMemes = window.sessionStorage.getItem('savedMemes') || []
      if (existingMemes === window.sessionStorage.getItem('savedMemes')) {
        existingMemes = JSON.parse(window.sessionStorage.getItem('savedMemes'))
      }
      existingMemes.push(newMeme)
      this.yourMemes = existingMemes
      window.sessionStorage.setItem('savedMemes', JSON.stringify(existingMemes))
    }

    this.memeClear = function () {
      window.sessionStorage.setItem('savedMemes', JSON.stringify([]))
      $window.location.reload()
    }

    this.create = function () {
      if (this.newMeme.img_url === undefined) {
        this.randomPhotoUrl = this.createPhoto.data.memes[Math.floor(Math.random() * this.createPhoto.data.memes.length)].url
        this.newMeme.img_url = this.randomPhotoUrl
      }
      if (this.newMeme.text === undefined) {
        this.newMeme.text = this.funnyText.attachments[0].fallback
      }
      this.newMeme.$save((newMeme) => {
        this.addMeme(newMeme)
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
      Comment.delete({id: comId}, comment)
    }
    this.edit = function () {
      this.meme.$update({ id: $state.params.id }, () => {
        this.editMeme(this.meme)
      })

      this.editMeme = function (meme) {
        var existingMemes = window.sessionStorage.getItem('savedMemes') || []
        if (existingMemes === window.sessionStorage.getItem('savedMemes')) {
          existingMemes = JSON.parse(window.sessionStorage.getItem('savedMemes'))
          var updateMeme = existingMemes.find(x => x.id === meme.id)
          if (updateMeme !== undefined) {
            var index = existingMemes.indexOf(updateMeme)
            existingMemes.splice(index, 1)
            existingMemes.push(meme)
          }
        }
        this.yourMemes = existingMemes
        window.sessionStorage.setItem('savedMemes', JSON.stringify(existingMemes))
      }
    }
    this.delete = function () {
      this.meme.$delete({ id: $state.params.id }, () => {
        $state.go('memeIndex')
      })
    }
    this.newPhoto = function () {
      this.randomPhotoUrl = this.photo.data.memes[Math.floor(Math.random() * this.photo.data.memes.length)].url
      this.meme.img_url = this.randomPhotoUrl
      this.meme.$update({ id: $state.params.id }, () => {
        this.editMeme(this.meme)
      })
    }
    this.newText = function () {
      this.meme.text = this.funnyText.attachments[0].fallback
      this.meme.$update({ id: $state.params.id }, () => {
        this.funnyText = Text.get()
        this.editMeme(this.meme)
      })
    }
    this.catPicture = function () {
      this.meme.img_url = this.newCat.file
      this.meme.$update({ id: $state.params.id }, () => {
        this.newCat = Cat.get()
        this.editMeme(this.meme)
      })
    }
    this.dropPhoto = function () {
      this.meme.img_url = this.dropDownPhoto.url
      this.meme.$update({ id: $state.params.id }, () => {
        this.editMeme(this.meme)
      })
    }

    this.editMeme = function (meme) {
      var existingMemes = window.sessionStorage.getItem('savedMemes') || []
      if (existingMemes === window.sessionStorage.getItem('savedMemes')) {
        existingMemes = JSON.parse(window.sessionStorage.getItem('savedMemes'))
        var updateMeme = existingMemes.find(x => x.id === meme.id)
        if (updateMeme !== undefined) {
          var index = existingMemes.indexOf(updateMeme)
          existingMemes.splice(index, 1)
          existingMemes.push(meme)
        }
      }
      this.yourMemes = existingMemes
      window.sessionStorage.setItem('savedMemes', JSON.stringify(existingMemes))
    }
  }
})()
