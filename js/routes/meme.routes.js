/* global angular */
(function () {
  angular
  .module('dankMemes')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    Router
  ])
  function Router ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('memeIndex', {
      url: '/memes',
      controller: 'MemeIndexController',
      controllerAs: 'vm',
      templateUrl: 'js/ng-views/index.html'
    })
    $urlRouterProvider.otherwise('/memes')
  }
})()
