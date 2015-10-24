/*global define*/
'use strict';

define([
  'db/storageService'
], function (storageService) {
  var moduleName = 'fiche.service';
  angular.module(moduleName, [
    storageService
  ]).factory("ficheService", function (storageService, $q) {
    'use strict';
    var service = {
      nomBase: "todos",
      em: null,
      lists: [],
      initFicheService: function () {
        if (service.em == null) {
          service.em = storageService.init(service.nomBase);
        }
      },
      loadFicheService: function (id) {
        service.initFicheService();
        var deferred = $q.defer();
        storageService.getBy(service.em, {parent: id}).then(function (res) {
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      getNbFicheParent: function (list) {
        var deferred = $q.defer();
        service.initFicheService();

        for (var i in list) {
          storageService.find(service.em, { index: { fields: ['parent'] } }, { index: i, selector: {parent: list[i]._id}, fields: ['parent', 'completed'] }).then(function(res) {
            var completed = 0;
            for (var i in res.result.docs) {
              if (res.result.docs[i].completed) {
                completed++;
              }
            }
            list[res.map.index].completed = completed;
            list[res.map.index].all = res.result.docs.length;
            deferred.resolve();
          });
        }
        return deferred.promise;
      }
    };
    return service;
  });

  return moduleName;
});

