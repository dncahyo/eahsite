'use strict';
angular.module('app.config', []).factory('appConfig',[
function () {
    var baseApiUrl = 'http://' + window.location.hostname;
    var baseClientUrl = 'http://' + window.location.host;
    var config = {};
    config.baseApiUrl = baseApiUrl;
    config.baseClientUrl = baseClientUrl;
    return config;
}]);