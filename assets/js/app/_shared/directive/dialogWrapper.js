/*globals angular*/
'use strict';

angular.module('app')
.directive('dialogWrapper', [
    'dialogModal', 
function(dialogModal) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '=',
      config: '=',
      context: '=',
      baseDialogConf: '=',
    },
    link : function (sc, element, attrs) {
        sc.pe = typeof(sc.control) === 'object' ? sc.control : (sc.control = {});
        sc.config = typeof(sc.config) === 'object' ? sc.config : (sc.config = {});
        
        sc.pe.show = show;
        sc.pe.show_i = show_i;
        
        sc.baseDialogConf = sc.baseDialogConf || {};
        sc.context = typeof(sc.context) === 'object' ? sc.context : (sc.context = {});
        
        init();
        
        function init(){
            sc.config.call_now ? show(sc.context, sc.baseDialogConf) : 0;
        }
        
        function show(context_opt, base_opt){
            var dialog_conf = angular.extend(angular.copy(sc.context), context_opt || {});
            var conf = angular.extend(dialogModal.set_context(dialog_conf), sc.baseDialogConf, base_opt || {});
            var res = dialogModal.show(conf);
            res.result.then(sc.config.succ_cb, sc.config.err_cb);
        }
        
        function show_i(ctx, base){
            var ctx_opt = typeof(sc.context._f) == "function" ? sc.context._f(ctx) : {};
            var base_opt = typeof(sc.baseDialogConf._f) == "function" ? sc.baseDialogConf._f(base) : {};
            return show(ctx_opt,base_opt);
        }
    }
  };
}]);