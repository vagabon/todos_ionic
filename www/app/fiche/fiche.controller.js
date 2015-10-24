'use strict';

define([
  'db/storageService',
  'fiche/fiche.service',
  'liste/liste.service',
  'jquery'
], function (storageService, ficheService) {

  var moduleName = 'todos.fiche.controller';

  angular.module(moduleName, [ficheService]).controller('TodosFicheController',
    function TodosFicheController($cordovaSQLite, $ionicNavBarDelegate, $ionicListDelegate, $ionicPlatform, $stateParams, $ionicPopup, storageService, ficheService, listeService) {
      $ionicNavBarDelegate.showBackButton(true);

      var vm = this;
      vm.lists = [];

      ficheService.loadFicheService($stateParams.categoryId).then(function(res) {
        vm.lists = res;
      });

      vm.updateParent = function(completed, all) {
        for (var i in listeService.lists) {
          if (listeService.lists[i]._id == $stateParams.categoryId) {
            listeService.lists[i].completed = listeService.lists[i].completed + completed;
            listeService.lists[i].all = listeService.lists[i].all + all;
          }
        }
      }

      for (var i in listeService.lists) {
        if (listeService.lists[i]._id == $stateParams.categoryId) {
          vm.title = listeService.lists[i].name;
        }
      }

      // Insert a new TodoList
      vm.insert = function () {
        $ionicPopup.prompt({
          title: "Enter a new Todo list",
          inputType: "text"
        }).then(function (result) {
          if (result !== undefined) {
            var list = {
              parent: $stateParams.categoryId,
              value: result,
              completed: false
            };
            storageService.insert(ficheService.em, list).then(function(res) {
              vm.lists.push(res);
              vm.updateParent(0, 1);
            });
          } else {
            console.log("Action not completed");
          }
        });
      }

      vm.closeEditable = function() {
        for (var i in vm.lists) {
          vm.lists[i].editer = false;
        }
      }

      vm.click = function(index) {
        console.log($("input").parent().html());
        for (var i in vm.lists) {
          if (vm.lists[i].editer) {
            return;
          }
        }
        vm.lists[index].completed = !vm.lists[index].completed;
        storageService.update(ficheService.em, vm.lists[index]._id, {completed: vm.lists[index].completed});
        vm.updateParent(vm.lists[index].completed ? 1 : -1, 0);
      }

      vm.blur = function(index) {
        storageService.update(ficheService.em, vm.lists[index]._id, {value: vm.lists[index].value});
        vm.closeEditable();
        $ionicListDelegate.closeOptionButtons();
      }

      vm.onSwipeLeft = function(id) {
        vm.closeEditable();
        vm.lists[id].editer = true;
        setTimeout(function() {
          $("input.editable").focus();
          $("input.editable").css("margin-left", "60px");
        }, 100);
      }

      vm.onSwipeRigth = function() {
        vm.closeEditable();
      }

      vm.delete = function (id) {
        storageService.remove(ficheService.em, id).then(function() {
          var index = 0;
          for (var i in vm.lists) {
            if (vm.lists[i]["_id"] == id) {
              index = i;
            }
          }
          vm.updateParent(vm.lists[index].completed ? -1 : 0, -1);
          vm.lists.splice(index, 1);
        });
      }
    });

  return moduleName;
});
