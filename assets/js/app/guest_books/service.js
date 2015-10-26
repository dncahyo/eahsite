/*globals angular, $*/
'use strict';
angular.module('app.guest_books',[]);
angular.module('app.guest_books')
.service('app.guest_books.service', [
    '$http',
    '$q',
    'appConfig',
function ($http, $q, appConfig) {
    var baseApiUrl = appConfig.baseApiUrl;
    var featuresApi = '/eahsite/app/model/guest_books.php';
    var service = {};

    service.create = create;
    service.one4all = one4all;
    return service;
    
    function create (opt) {
      var default_data = angular.extend({}, {model_func: 'create'}, opt || {});
      var req = {
        method: 'POST',
        url: baseApiUrl + featuresApi,
        //params: default_data,
        data: $.param(default_data),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      };

      return httpPromise(req);
    }
    
    function one4all (opt) {
      var default_data = opt || {};
      var req = {
        method: 'POST',
        url: baseApiUrl + featuresApi,
        //params: default_data,
        data: $.param(default_data),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      };

      return httpPromise(req);
    }

    function httpPromise(httpObj) {
      var deferred = $q.defer();

      $http(httpObj)
      .success(function(res){
        deferred.resolve(res);
      }).error(function(res){
        deferred.reject(res);
      });
      return deferred.promise;
    }
    
}]);