'use strict';

angular.module('app.auth').directive('authLogout', ['app.auth.service', function(appAuthService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '='
    },
    link : function (sc, element, attrs) {
        sc.pe = sc.control || {};
        sc.pe.logout = logout;
        
        function logout(cb, err_cb){
            appAuthService.sign_out().then(function(data){
                typeof(cb) == "function" ? cb(data) : 0;
            }, function(data){
                typeof(err_cb) == "function" ? err_cb(data) : 0;
            });
        }
    }
  };
}]);