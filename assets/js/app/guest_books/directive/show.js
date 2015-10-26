'use strict';

angular.module('app.guest_books').directive('guestBooksShow', ['app.guest_books.service', function(appGuestBookService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '=',
      config: '=',
    },
    link : function (sc, element, attrs) {
        sc.pe = typeof(sc.control) === 'object' ? sc.control : (sc.control = {});
        sc.pe.result={};
        sc.pe.show = show;
        
        sc.config.call_now ? show(sc.config.id) : 0;
        
        function show(id, cb, err_cb){
            appGuestBookService.one4all({model_func: 'show', id: id}).then(function(data){
                typeof(cb) == "function" ? cb(data) : 0;
                angular.extend(sc.pe.result, data);
            }, function(data){
                typeof(err_cb) == "function" ? err_cb(data) : 0;
            });
        }
    }
  };
}]);