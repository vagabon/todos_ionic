'use strict';

define([
  'liste/liste.controller'
], function (listeController) {

  var moduleName = 'todos.liste.route';

  angular.module(moduleName, [listeController]).config(function RouteConfig($stateProvider) {
    $stateProvider.state('app.liste', {
      url: '/liste',
      views: {
        'menuContent': {
          templateUrl: 'app/liste/template.liste.html',
          controller: 'todosListeController as vm'
        }
      }
    });
  });

  return moduleName;
});
