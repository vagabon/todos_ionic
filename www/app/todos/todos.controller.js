/*global define*/
'use strict';

define([
  'db/storageService'
], function (storageService) {
  var moduleName = 'todos.controller';

  angular.module(moduleName, [storageService]).controller('TodosController', function TodosController(storageService, $ionicHistory, $ionicPlatform, $ionicLoading, $location) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    console.log("Initialisation de l'application...")

    $ionicLoading.show({template: "Chargement..."});
      $ionicLoading.hide();
    $location.path("/liste");

  });

  return moduleName;
});
