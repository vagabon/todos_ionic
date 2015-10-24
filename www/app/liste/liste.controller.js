'use strict';

define([
  'liste/liste.service',
  'fiche/fiche.service',
], function (listeService, ficheService) {

  var moduleName = 'todos.liste.controller';

  angular.module(moduleName, [
    listeService,
    ficheService
  ]).controller('todosListeController', function FeldsListeController($scope, listeService, ficheService, storageService, $http, $ionicModal, $ionicListDelegate) {

    var vm = this;
    vm.categories = [];

    // https://developers.google.com/apis-explorer/?hl=fr#p/youtube/v3/
    $http({ method: 'GET', url: 'https://www.googleapis.com/youtube/v3/search?', params: {
      part: 'snippet',
      forUserName: "GoogleDevelopers",
      key: 'AIzaSyA7NbCey1_PzynOULpw9g6m0J94hwTWSHg'
    }}).then(
      function (data) {console.log(data);
    });

    listeService.loadListeService().then(function() {
      vm.categories = listeService.lists;
      ficheService.getNbFicheParent(listeService.lists).then(function() {
        vm.categories = listeService.lists;
      })
    });

    $scope.$on('$ionicView.beforeEnter', function() {
      $ionicListDelegate.closeOptionButtons();
      vm.categories = listeService.lists;
    });

    vm.formListData = {};
    vm.modal  = null;

    vm.delete = function (id) {
      // TODO : supprimer les enfants !
      storageService.remove(listeService.em, id).then(function() {
        var index = 0;
        for (var i in vm.categories) {
          if (vm.categories[i]["_id"] == id) {
            index = i;
          }
        }
        vm.categories.splice(index, 1);
      });
    }

    vm.edit = function (id) {
      var index = 0;
      for (var i in vm.categories) {
        if (vm.categories[i]["_id"] == id) {
          index = i;
        }
      }
      vm.formListInit();
      for (var i in vm.categories[index]) {
        vm.formListData[i] = vm.categories[index][i];
      }
      vm.formListShow();
    }

    /************
     * Modale d'insertion
     */

    $ionicModal.fromTemplateUrl('app/liste/templace.liste.add.html', { scope: $scope }).then(function (modal) {
      vm.modal = modal;
    });

    vm.formListClose = function () {
      $ionicListDelegate.closeOptionButtons();
      vm.modal.hide();
    };

    vm.formListAdd = function () {
      vm.formListInit();
      vm.formListShow();
    };

    vm.formListShow = function () {
      vm.modal.show();
    };

    vm.formListInit = function(json) {
      if (json != undefined) {
      }
      vm.formListData = {
        colors: [ "green", "yellow", "orange", "grey", "red" ],
        icons: [ "ion-social-chrome", "ion-social-tux", "ion-social-octocat", "ion-android-notifications", "ion-android-exit", "ion-android-star", "ion-android-image", "ion-android-folder" ],
        types: [{ value: "todo", name: "Todo" }, { value: "memo", name: "Mémo" }, { value: "anniv", name: "Anniversaire" }]
      };
      vm.formListData.data = [ "name", "color", "icon", "type" ]; // , "date"
      vm.formListInitError();
    }

    vm.formListInitError = function() {
      vm.formListData.error = {};
      for (var i in vm.formListData.data) {
        vm.formListData.error[vm.formListData.data[i]] = false;
      }
    }

    vm.checkError = function() {
      vm.formListInitError();
      var find = false;
      for (var i in vm.formListData.data) {
        if (vm.formListData[vm.formListData.data[i]] == undefined || vm.formListData[vm.formListData.data[i]] == "") {
          vm.formListData.error[vm.formListData.data[i]] = true;
          find = true;
        }
      }
      return find;
    }

    vm.formListSubmit = function () {
      console.log(vm.formListData)
      if (!vm.checkError()) {
        if (vm.formListData._id == undefined || vm.formListData._id == "") {
          console.log("création")
          storageService.insert(listeService.em, vm.formListData).then(function(res) {
            res.completed = 0;
            res.all = 0;
            vm.categories.push(res);
          });
        } else {
          console.log("MAJ")
          var json = {
            name: vm.formListData.name,
            date: vm.formListData.date,
            color: vm.formListData.color,
            icon: vm.formListData.icon,
            type: vm.formListData.type
          };
          var index = 0;
          for (var i in vm.categories) {
            if (vm.categories[i]["_id"] == vm.formListData._id) {
              index = i;
            }
          }
          for (var i in json) {
            vm.categories[index][i] = json[i];
          }
          storageService.update(listeService.em, vm.formListData._id, json);
        }
        vm.formListClose();
      }
    };
    vm.formListInit();

  });

  return moduleName;
});
