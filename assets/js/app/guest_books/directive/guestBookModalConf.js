/*globals angular*/
'use strict';

angular.module('app')
.directive('guestBooksModalConf', [
    'dialogModal', 
function(dialogModal) {
  return {
    restrict: 'E',
    transclude: true,
    template: "<div ng-transclude></div>",
    scope: {
      control: '=',
    },
    link : function (sc, element, attrs) {
        sc.pe = typeof(sc.control) === 'object' ? sc.control : (sc.control = {});
        
        //CREATE MODAL
        sc.pe.create = {};
        sc.pe.create.context = {
            title: "Create Guest Books",
            gbooksCreate: {},
        };
        sc.pe.create.baseDialogConf = {
            templateUrl: "assets/js/app/guest_books/template/createModal.html"
        };
        
        
        //SHOW MODAL
        sc.pe.show = {};
        sc.pe.show.context = {
            title: "Show Guest Books",
            contentUrl: "assets/js/app/guest_books/template/showModal.html",
            actions: {
                close: ['OK']
            },
            gbooksShow: {},
            gbooksShowConfig: {call_now: true, id:1}
        };
        sc.pe.show.context._f = function(id){
            return id ? {gbooksShowConfig: {call_now: true, id: id}} : {};
        };
        
        //UPDATE MODAL
        sc.pe.update = {};
        sc.pe.update.context = {
            title: "Update Guest Books",
            //contentUrl: "assets/js/app/guest_books/template/updateModal.html",
            // actions: {
            //     close: [{text: 'UPDATE', func: function(context){context.gbooksUpdate.update(context.result)}}],
            //     dismiss: ['CANCEL']
            // },
            gbooksUpdate: {},
            gbooksShow: {},
            gbooksShowConfig: {call_now: true, id:1},
            result:{}
        };
        sc.pe.update.baseDialogConf = {
            templateUrl: "assets/js/app/guest_books/template/updateModal.html"
        };
        sc.pe.update.context._f = function(id){
            return id ? {gbooksShowConfig: {call_now: true, id: id}} : {};
        };
        
        //DESTROY MODAL
        sc.pe.destroy = {};
        sc.pe.destroy.context = {
            title: "Delete Guest Books",
            contentUrl: "assets/js/app/guest_books/template/destroyModal.html",
            actions: {
                close: [{text: 'DELETE', func: function(context){
                    context.gbooksDestroy.destroy(context.result)}}],
                dismiss: ['CANCEL']
            },
            gbooksDestroy: {},
            gbooksShow: {},
            gbooksShowConfig: {call_now: true, id:1},
            result:{}
        };
        sc.pe.destroy.context._f = function(id){
            return id ? {gbooksShowConfig: {call_now: true, id: id}} : {};
        };
    }
  };
}]);