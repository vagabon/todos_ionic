/*global require*/
'use strict';

require([
  'ionic'
], function () {
  angular.module('todos', []);
  require([
    'ngCordova',
  ], function () {
    require([
      'todos/todos.route',
      'liste/liste.route',
      'fiche/fiche.route'
    ], function (todosRoute, listeRoute, ficheRoute) {
      angular.module('todos', [
        'ionic',
        'ngCordova',
        todosRoute,
        listeRoute,
        ficheRoute
      ]).run(function ($ionicPlatform, $location) {
        $ionicPlatform.ready(function () {
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
          }
          if (window.StatusBar) {
            StatusBar.styleDefault();
          }
          $location.path("/init");
        });
      });
      angular.bootstrap(document, ['todos']);
    });
  });
});
