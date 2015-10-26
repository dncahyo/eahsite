'use strict';

angular.module('app.news').directive('newsDestroy', ['app.news.service', function(appNewsService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '='
    },
    link : function (sc, element, attrs) {
        sc.pe = sc.control || {};
        sc.pe.destroy = destroy;
        
        function destroy(opt, cb, err_cb){
            var default_data = angular.extend({}, {model_func: 'destroy'}, opt || {});
            appNewsService.one4all(default_data).then(function(data){
                typeof(cb) == "function" ? cb(data) : 0;
            }, function(data){
                typeof(err_cb) == "function" ? err_cb(data) : 0;
            });
        }
    }
  };
}]);