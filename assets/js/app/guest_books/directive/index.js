/*globals angular*/
'use strict';

angular.module('app.guest_books')
.directive('gbooksIndex', ['app.guest_books.service', function(appGuestBooksService) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '=',
      config: '='
    },
    link : function (sc, element, attrs) {
        sc.pe = typeof(sc.control) === 'object' ? sc.control : (sc.control = {});
        sc.pe.pagination = {page:1, count:5};
        sc.pe.next_page = next_page;
        sc.pe.prev_page = prev_page;
        sc.pe.reload = reload;
        
        sc.config = sc.config || {};
        
        sc.config.call_now ? reload(sc.config.pagination) : 0;
        
        function reload(pagination){
            var def_pagination = pagination || sc.pe.pagination;
            sc.pe.pagination = def_pagination;
            appGuestBooksService.one4all(angular.extend({model_func:'index'},def_pagination)).then(function (data) {
                if (data.length > def_pagination.count){
                    data.pop();
                    sc.pe.results = data;
                    sc.pe.next_page_btn = true;
                }else {
                    sc.pe.results = data;
                    sc.pe.next_page_btn = false;
                }
                sc.pe.prev_page_btn = sc.pe.pagination.page > 1;
            });
        }
        
        function next_page(){
            sc.pe.pagination.page++;
            reload();
        }
        
        function prev_page(){
            sc.pe.pagination.page--;
            reload();
        }
    }
  };
}]);