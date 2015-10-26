'use strict';

angular.module('app.news').directive('newsCreate', ['app.news.service', function(appNewsService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '='
    },
    link : function (sc, element, attrs) {
        sc.pe = sc.control || {};
        sc.pe.create = create;
        sc.pe.create_cb = create_cb;
        
        function create(opt, cb, err_cb){
            var default_data = angular.extend({}, {model_func: 'create'}, opt || {});
            appNewsService.one4all(default_data).then(function(data){
                typeof(cb) == "function" ? cb(data) : 0;
            }, function(data){
                typeof(err_cb) == "function" ? err_cb(data) : 0;
            });
        }
        
        function create_cb(opt){
            return function(){
                create(opt);
            };
        }
    }
  };
}]);