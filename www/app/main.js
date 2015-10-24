/*global require*/
'use strict';

require.config({
  paths: {
    ionic: '../lib/ionic/js/ionic.bundle',
    "jquery": '../lib/jquery/dist/jquery',
    "jquery-ui": '../lib/jquery-ui/jquery-ui.min',
    ngCordova: '../lib/ng-cordova/dist/ng-cordova.min',
    pouchdb: '../lib/pouchdb/dist/pouchdb.min',
    pouchdbGql: '../lib/pouchdb-gql/pouchdb.gql',
    "pouchdb-gql": '../lib/pouchdb-gql/dist/pouchdb.gql',
    "pouchdb-collate": '../lib/pouchdb-collate/dist/pouchdb-collate',
    "pouchdb-find": '../lib/pouchdb-find/dist/pouchdb.find',
    "ui-sortable": '../lib/ui-sortable/sortable',
    cordova: '../cordova'
  },
  shim: {
  },
  deps: ['app']
});
