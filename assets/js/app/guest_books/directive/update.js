'use strict';

angular.module('app.guest_books').directive('guestBooksUpdate', ['app.guest_books.service', function(appGuestBookService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '='
    },
    link : function (sc, element, attrs) {
        sc.pe = typeof(sc.control) === 'object' ? sc.control : (sc.control = {});
        sc.pe.update = update;
        sc.pe.update_cb = update_cb;
        
        function update(opt, cb, err_cb){
            var default_data = angular.extend({}, {model_func: 'update'}, opt || {});
            appGuestBookService.one4all(default_data).then(function(data){
                typeof(cb) == "function" ? cb(data) : 0;
            }, function(data){
                typeof(err_cb) == "function" ? err_cb(data) : 0;
            });
        }
        
        function update_cb(opt, cb, err_cb){
            return function(){
                update(opt, cb, err_cb);
            };
        }   
    }
  };
}]);