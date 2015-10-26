'use strict';
angular.module('app')
.service('chainFunc', [function() {
    var svcFunc = {};
    svcFunc.New = main;
    svcFunc.obj = obj;
    return svcFunc;
    
    function main(){
        var service = {};
        service.funcs = [];
        service.funcNoArgs = [];
        service.obj = obj;
        service.init = init;
        service.build = build;
        service.compose = compose;
        service.pushFunc = pushFunc;
        service.pushFuncNoArgs = pushFuncNoArgs;
        return service;
        
        function compose(){
            return function(){
                var arg = arguments;
                service.funcs.forEach(function(el){
                    el.ob[el.at].apply(el.ob,arg);
                });
                service.funcNoArgs.forEach(function(el){
                    el.ob[el.at]();
                });
            }
        }
        
        function pushFunc(arr_fc){
            service.funcs.push.apply(service.funcs, arr_fc);
            return service;
        }
        
        function pushFuncNoArgs(arr_fc){
            arr_fc.forEach(function(el){
                service.funcNoArgs.push(el);
            });
            //service.funcNoArgs.push.apply(service.funcNoArgs, arr_fc);
            return service;
        }
        
        function init(){
            service.funcs = [];
            service.funcNoArgs = [];
            return service;
        }
        
        function build(arrFunc, arrFcNoArgs){
            arrFunc = arrFunc || [];
            arrFcNoArgs = arrFcNoArgs || [];
            return service.init().pushFunc(arrFunc).pushFuncNoArgs(arrFcNoArgs).compose();
        }
    }
    
    function obj(object, attr){
            return {ob: object, at: attr};
        }
}]);