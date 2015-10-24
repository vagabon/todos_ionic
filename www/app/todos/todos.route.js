'use strict';
define(['todos/todos.controller'], function (todosController) {
  var moduleName = 'todos.route';

  angular.module(moduleName, [todosController]).config(function routeConfig($stateProvider){
    $stateProvider.state('app.init', {
      url: '/init',
      views: {
        'menuContent': {
          controller: 'TodosController as vm'
        }
      }
    });

    $stateProvider.state('app', {
      url: '',
      abstract: true,
      templateUrl: 'app/todos/menu.html'
    })
  });

  return moduleName;
});
