angular.module('app')
.service('dialogModal', ['$uibModal', function($uibModal) {
    var service = {};
    var def_opt = {
          animation: true,
          templateUrl: 'assets/js/app/_shared/template/dialogModal.html',
          controller: 'dialogModalCtrl as dmc',
          size: 'lg',
          resolve: {
            context: function () {
              return {};
            }
          }
        };
    
    service.show = show;
    service.set_context = set_context;
    return service;
    
    function show(opt) {
        var modal_opt = angular.extend({}, def_opt, opt);
        var modalInstance = $uibModal.open(modal_opt);
        return modalInstance;
    }
    
    function set_context(context){
        return {
            resolve: {
                context: function(){
                    return context;
                }
            }
        };
    }
}])
.controller('dialogModalCtrl', [
'$scope', 
'$modalInstance', 
'context',
function (sc, $uibModalInstance, context) {
    var dmc = this;
    var def = {
        title: "",
        content: "",
        contentUrl: "",
        actions: {
            close: ['Yes'],
            dismiss: ['No']
        }
    };
    
    angular.extend(sc, def, context);
    sc.onClose = onClose;
    sc.onDismiss = onDismiss;
    
    init_exit_btn(sc.actions);
    
    function init_exit_btn(actions){
        sc.close_btns = actions.close || [];
        sc.dismiss_btns = actions.dismiss_btns || [];
    }
    
    function onClose(action, cb){
        getContext();
        typeof(cb) == "function" ? cb(angular.extend(context, dmc)) : 0;
        $uibModalInstance.close({action: action, context: context});
    }
    
    function onDismiss(action){
        $uibModalInstance.dismiss(action);
    }
    
    function getContext(){
        for (var property in context) {
            if (context.hasOwnProperty(property)) {
                context[property] = sc[property];
            }
        }
    }
}]); 