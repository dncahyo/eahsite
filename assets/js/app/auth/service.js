/* globals angular, $ */

'use strict';
angular.module('app.auth',[]);
angular.module('app.auth')
.service('app.auth.service', [
    '$http',
    '$q',
    'appConfig',
function ($http, $q, appConfig) {
    var baseApiUrl = appConfig.baseApiUrl;
    var authPath = '/eahsite/app/auth/';
    var service = {};

    service.sign_in = sign_in;
    service.sign_out = sign_out;
    service.signed_in_check = signed_in_check;
    return service;

    function sign_in (opt) {
      var default_data = opt || {};
      var req = {
        method: 'POST',
        url: baseApiUrl + authPath + "sign_in.php",
        data: $.param(default_data),
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      };

      return httpPromise(req);
    }
    
    function sign_out (opt) {
      var req = {
        method: 'GET',
        url: baseApiUrl + authPath + "sign_out.php",
      };

      return httpPromise(req);
    }
    
    function signed_in_check (opt) {
      var req = {
        method: 'GET',
        url: baseApiUrl + authPath + "signed_in_check.php",
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