'use strict';
angular.module('app',[
    'ui.router',
    'ui.bootstrap',
    'app.config',
    'app.news',
    'app.guest_books',
    'app.auth',
    'app.html_pages',
    'app.html_layout',
    
]).config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('site', {
      abstract: true,
      url: "",
      templateUrl: "assets/js/app/_layout/blank_nav.html"
      //template: '<ui-view/>'
    })
    .state('site.home', {
      url: "/home",
      templateUrl: "assets/js/app/_pages/home.html",
      
    })
    .state('admin', {
      abstract: true,
      url: "/admin",
      //templateUrl: "assets/js/app/_layout/blank_nav.html"
      template: '<ui-view/>'
    })
    .state('admin.signin', {
      url: "/signin",
      templateUrl: "assets/js/app/_pages/signin.html"
    })
    .state('admin.panel', {
      abstract: true,
      url: "",
      templateUrl: "assets/js/app/_layout/admin_blank_nav.html"
    })
    .state('admin.panel.news', {
      url: "/news",
      templateUrl: "assets/js/app/_pages/adm_news.html"
    })
    .state('admin.panel.guest_books', {
      url: "/guest_books",
      templateUrl: "assets/js/app/_pages/adm_guest_books.html"
    });
});

