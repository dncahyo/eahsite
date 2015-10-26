'use strict';

angular.module('app.html_pages')
.controller('app.html_pages.home.ctrl',[
'$scope',
function (sc) {
    var vm = this;
    sc.submit_success = submit_success;
    sc.submit_err = submit_err;
    sc.guestBooksCreate = {};
    sc.newsIdx = {};
    
    function submit_success(data){
        alert("done");
    }
    
    function submit_err(data){
        alert("err "+data.message);
    }
}]);