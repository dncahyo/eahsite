/*globals angular*/
'use strict';

angular.module('app.news')
.directive('newsIndex', ['app.news.service', function(appNewsService) {
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
        sc.pe.pagination = {page:1, count:5};
        sc.pe.next_page = next_page;
        sc.pe.prev_page = prev_page;
        sc.pe.init = init;
        
        sc.config = sc.config || {};
        
        sc.config.call_now ? init(sc.config.pagination) : 0;
        
        function init(pagination){
            var def_pagination = pagination || sc.pe.pagination;
            sc.pe.pagination = def_pagination;
            appNewsService.index(def_pagination).then(function (data) {
                if (data.length > def_pagination.count){
                    data.pop();
                    sc.pe.newses = data;
                    sc.pe.next_page_btn = true;
                }else {
                    sc.pe.newses = data;
                    sc.pe.next_page_btn = false;
                }
                sc.pe.prev_page_btn = sc.pe.pagination.page > 1;
            });
        }
        
        function next_page(){
            if (sc.pe.next_page_btn){
                sc.pe.pagination.page++;
                init();
            }
        }
        
        function prev_page(){
            if (sc.pe.pagination.page > 1){
                sc.pe.pagination.page--;
                init();
            }
        }
    }
  };
}]);