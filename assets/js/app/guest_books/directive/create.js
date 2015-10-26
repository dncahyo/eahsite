'use strict';

angular.module('app.guest_books').directive('guestBooksCreate', ['app.guest_books.service', function(appGuestBookService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '='
    },
    link : function (sc, element, attrs) {
        sc.pe = typeof(sc.control) === 'object' ? sc.control : (sc.control = {});
        sc.pe.create = create;
        sc.pe.create_cb = create_cb;
        
        function create(guest_book, cb, err_cb){
            appGuestBookService.create(guest_book).then(function(data){
                typeof(cb) == "function" ? cb(data) : 0;
            }, function(data){
                typeof(err_cb) == "function" ? err_cb(data) : 0;
            });
        }
        function create_cb(opt, cb, err_cb){
            return function(){
                create(opt, cb, err_cb);
            };
        }   
    }
  };
}]);