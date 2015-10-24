/*global define*/
'use strict';

define([
  'db/storageService'
], function (storageService) {
  var moduleName = 'liste.service';
  angular.module(moduleName, [
    storageService
  ]).factory('listeService', function (storageService, $q) {
    'use strict';
    var service = {
      nomBase: "base",
      em: null,
      lists: [],
      initListeService: function() {
        var deferred = $q.defer();
        if (service.em == null) {
          storageService.init(service.nomBase).then(function(db) {
            service.em = db;
            deferred.resolve();
          });
        }
        return deferred.promise;
      },
      loadListeService: function() {
        var deferred = $q.defer();
        service.initListeService().then(function() {
          storageService.getAll(service.em).then(function(result) {
            service.lists = result;
            deferred.resolve();
          });
        })
        return deferred.promise;
      }
    };
    return service;
  });

  return moduleName;
});

