'use strict';

define([
  'fiche/fiche.controller'
], function (ficheController) {

  var moduleName = 'todos.fiche.route';

  angular.module(moduleName, [ficheController]).config(function RouteConfig($stateProvider) {
    $stateProvider.state('app.fiche', {
      url: '/fiche/:categoryId',
      views: {
        'menuContent': {
          templateUrl: 'app/fiche/fiche.html',
          controller: 'TodosFicheController as vm'
        }
      }
    });
  });

  return moduleName;
});
