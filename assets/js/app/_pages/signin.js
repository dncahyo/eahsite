'use strict';

angular.module('app.auth')
.controller('app.auth.signin.ctrl',[
'app.auth.service',
'$state',
'$rootScope',
function (appAuthService, $state, $rootScope) {
    var vm = this;
    vm.submit = submit;
    
    function submit(user){
        appAuthService.sign_in(user).then(function(data){
            alert(data.message);
            $rootScope.current_user = data.user;
            $state.go('admin.panel.news');
        },function(data){
            alert(data.message);
        });
    }
    
}]);