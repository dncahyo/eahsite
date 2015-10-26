'use strict';

angular.module('app.guest_books').directive('guestBooksDestroy', ['app.guest_books.service', function(appGuestBookService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '='
    },
    link : function (sc, element, attrs) {
        sc.pe = typeof(sc.control) === 'object' ? sc.control : (sc.control = {});
        sc.pe.destroy = destroy;
        sc.pe.destroy_cb = destroy_cb;
        
        function destroy(opt, cb, err_cb){
            var default_data = angular.extend({}, {model_func: 'destroy'}, opt || {});
            appGuestBookService.one4all(default_data).then(function(data){
                typeof(cb) == "function" ? cb(data) : 0;
            }, function(data){
                typeof(err_cb) == "function" ? err_cb(data) : 0;
            });
        }
        
        function destroy_cb(opt, cb, err_cb){
            return function(){
                destroy(opt, cb, err_cb);
            };
        }   
    }
  };
}]);