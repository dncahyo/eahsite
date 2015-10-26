/*globals angular, $*/

'use strict';
angular.module('app.news',[]);
angular.module('app.news')
.service('app.news.service', [
    '$http',
    '$q',
    'appConfig',
function ($http, $q, appConfig) {
    var baseApiUrl = appConfig.baseApiUrl;
    var featuresApi = '/eahsite/app/model/news.php';
    var service = {};

    service.index = index;
    service.one4all = one4all;
    return service;

    function index (opt) {
      var default_data = angular.extend({}, {model_func: 'index'}, opt || {});
      var req = {
        method: 'GET',
        url: baseApiUrl + featuresApi,
        params: default_data,
      };

      return httpPromise(req);
    }
    
    function one4all (opt) {
      var default_data = opt || {};
      var req = {
        method: 'POST',
        url: baseApiUrl + featuresApi,
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