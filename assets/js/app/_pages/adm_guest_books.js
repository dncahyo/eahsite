'use strict';

angular.module('app.html_pages')
.controller('app.html_pages.adm_guest_books.ctrl',[
'$scope',
'chainFunc',
function (sc, chainFunc) {
    var cfObj = chainFunc.obj;
    
    sc.gbooksIdx = {};
    sc.gbooksCreateModalConf  = {};
    sc.gbooksUpdateModalConf  = {};
    sc.gbooksDestroyModalConf = {};
    
    sc.gbooksCreateModalConf.succ_cb  = chainFunc.New().build([cfObj(console, 'log')],[cfObj(sc.gbooksIdx,'reload')]);
    sc.gbooksUpdateModalConf.succ_cb  = chainFunc.New().build(null,[cfObj(sc.gbooksIdx,'reload')]);
    sc.gbooksDestroyModalConf.succ_cb = chainFunc.New().build(null,[cfObj(sc.gbooksIdx,'reload')]);
}]);