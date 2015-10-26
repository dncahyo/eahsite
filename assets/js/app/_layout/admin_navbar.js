'use strict';

angular.module('app.html_layout')
.controller('app.html_layout.admin_navbar.ctrl',[
'$scope',
'$state',
function (sc, $state) {
    sc.authLogout={};
    
    sc.logout_succ = logout_succ;
    sc.logout_err = logout_err;
    
    function logout_succ(data){
        alert(data.message);
        $state.go('site.home');
    }
    
    function logout_err(data){
        alert(data.message);
    }
    
}]);