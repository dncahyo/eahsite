'use strict';

angular.module('app.html_pages')
.controller('app.html_pages.adm_news.ctrl',[
'$scope',
'chainFunc',
function (sc, chainFunc) {
    var cFc = chainFunc;
    var cfcObj = chainFunc.obj;
    
    init();
    
    function init(){
        ['newsShowModal',
        'nmc',
        'newsCreateModal', 'newsCreateModalConf',
        'newsUpdateModal', 'newsUpdateModalConf',
        'newsDestroyModal','newsDestroyModalConf',
        'newsIdx',].forEach(function(el){
           sc[el] = {};
        });
        
        sc.newsCreateModalConf.succ_cb = chainFunc.New().build([cfcObj(console, 'log')],[cfcObj(sc.newsIdx,'init')]);
        sc.newsUpdateModalConf.succ_cb = chainFunc.New().build(null, [cfcObj(sc.newsIdx,'init')]);
        sc.newsDestroyModalConf.succ_cb = chainFunc.New().build(null, [cfcObj(sc.newsIdx,'init')]);
    }
    
}]);