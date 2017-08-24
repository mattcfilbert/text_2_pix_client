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
    // The following all pull data from the several APIs we have implemented, including our rails server
    this.memes = Meme.query()
    this.photo = Photo.get()
    this.createPhoto = Photo.get()
    this.newMeme = new Meme()
    this.funnyText = Text.get()
    // This references the session data storage, which keeps track of the memes a user has recently created.
    // It will either return the saved session data or, in the absence of that, an empty array
    this.yourMemes = window.sessionStorage.getItem('savedMemes') || []
    // If the session data is retrieved, it will be parsed from JSON so it is readable JS code
    if (this.yourMemes === window.sessionStorage.getItem('savedMemes')) {
      this.yourMemes = JSON.parse(window.sessionStorage.getItem('savedMemes'))
    }

    // The following function is used to store newly created memes in session session storage
    // It pulls down session data, parses it into an array, and pushed the new meme into it before sending it back
    this.addMeme = function (newMeme) {
      var existingMemes = window.sessionStorage.getItem('savedMemes') || []
      if (existingMemes === window.sessionStorage.getItem('savedMemes')) {
        existingMemes = JSON.parse(window.sessionStorage.getItem('savedMemes'))
      }
      existingMemes.push(newMeme)
      this.yourMemes = existingMemes
      window.sessionStorage.setItem('savedMemes', JSON.stringify(existingMemes))
    }

    // This function empties the session storage
    this.memeClear = function () {
      window.sessionStorage.setItem('savedMemes', JSON.stringify([]))
      $window.location.reload()
    }

    // This function creates new memes
    this.create = function () {
      // This pair of "if" statements pulls a random joke and image in the absence of user input for meme creation
      if (this.newMeme.img_url === undefined) {
        this.randomPhotoUrl = this.createPhoto.data.memes[Math.floor(Math.random() * this.createPhoto.data.memes.length)].url
        this.newMeme.img_url = this.randomPhotoUrl
      }
      if (this.newMeme.text === undefined) {
        this.newMeme.text = this.funnyText.attachments[0].fallback
      }
      // Arrow function manages timing of functions
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

    // This function uses a callback function to make sure the page reloads after the comment is created
    this.createComment = function () {
      this.newComment.meme_id = this.meme.id
      this.newComment.$save(() => {
        $window.location.reload()
      })
    }
    // This function pulls each comment's ID when they are displayed in the view via ng-repeat
    // It waits to update until the comment's ID is found (cannot simply grab from params; no comments page)
    this.editComment = function (comId) {
      const comment = this.meme.comments.find(function (comment) {
        return comment.id === comId
      })
      Comment.update({id: comId}, comment)
    }
    // Similar to editComment in required callback
    this.deleteComment = function (comId) {
      const comment = this.meme.comments.find(function (comment) {
        return comment.id === comId
      })
      Comment.delete({id: comId}, comment)
    }
    // This function saves edits to memes to the database
    // It also saves changes to local storage using a similar function to the one found in the index controller
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
    // simple delete function for memes that redirects to the index
    this.delete = function () {
      this.meme.$delete({ id: $state.params.id }, () => {
        $state.go('memeIndex')
      })
    }
    // the following functions are used to grab random data (images and text)
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
    // Potentially redundant... in fact almost definitely. I've grown attatched to each and will leave both
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
