/*globals angular*/
'use strict';

angular.module('app')
.directive('newsModalConf', [
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
        sc.pe = sc.control || {};
        
        sc.pe.create = {};
        sc.pe.create.context = {
            title: "Create News",
            newsCreate: {},
            result: {},
        };
        sc.pe.create.baseDialogConf = {
            templateUrl: "assets/js/app/news/template/newsCreateModal.html"
        };
        
        sc.pe.show = {};
        sc.pe.show.context = {
            title: "Show News",
            contentUrl: "assets/js/app/news/template/newsShowModal.html",
            actions: {
                close: ['OK']
            },
            newsShow: {},
            newsShowConfig: {call_now: true, id:1}
        };
        sc.pe.show.context._f = function(id){
            return id ? {newsShowConfig: {call_now: true, id: id}} : {};
        };
        
        sc.pe.update = {};
        sc.pe.update.context = {
            title: "Update News",
            contentUrl: "assets/js/app/news/template/newsUpdateModal.html",
            actions: {
                close: [{text: 'UPDATE', func: function(context){context.newsUpdate.update(context.result)}}],
                dismiss: ['CANCEL']
            },
            newsUpdate: {},
            newsShow: {},
            newsShowConfig: {call_now: true, id:1},
            result:{}
        };
        sc.pe.update.context._f = function(id){
            return id ? {newsShowConfig: {call_now: true, id: id}} : {};
        };
        
        sc.pe.destroy = {};
        sc.pe.destroy.context = {
            title: "Delete News",
            contentUrl: "assets/js/app/news/template/newsDestroyModal.html",
            actions: {
                close: [{text: 'DELETE', func: function(context){
                    context.newsDestroy.destroy(context.result)}}],
                dismiss: ['CANCEL']
            },
            newsDestroy: {},
            newsShow: {},
            newsShowConfig: {call_now: true, id:1},
            result:{}
        };
        sc.pe.destroy.context._f = function(id){
            return id ? {newsShowConfig: {call_now: true, id: id}} : {};
        };
    }
  };
}]);