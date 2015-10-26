/*globals angular*/
'use strict';

angular.module('app.news')
.directive('newsShow', ['app.news.service', function(appNewsService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '=',
      config: '='
    },
    link : function (sc, element, attrs) {
        sc.pe = sc.control || {};
        sc.pe.show = show;
        sc.pe.result = {};
        
        sc.config.call_now ? show(sc.config.id) : 0;
        
        function show(id, cb, err_cb){
            appNewsService.one4all({model_func: 'show', id: id}).then(function(data){
                typeof(cb) == "function" ? cb(data) : 0;
                angular.extend(sc.pe.result, data);
            }, function(data){
                typeof(err_cb) == "function" ? err_cb(data) : 0;
                sc.pe.result = data;
            });
        }
    }
  };
}]);