
angular.module('app', [
    'ngMaterial',
    //'ui.router',
    'controllers.sideMenu',
    'controllers.music',
    'controllers.tv',
    'controllers.movies',
    'services.music',
    'services.movies',
    'services.tv',
    'services.account'
])

    .config(function($mdThemingProvider, $mdIconProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('blue');
    })


    //.config(function ($stateProvider, $urlRouterProvider) {
    //    $stateProvider
    //        .state('app', {
    //            abstract: true
    //        })
    //        .state('music', {
    //            url: '/music',
    //            templateUrl: 'templates/music.html',
    //            controller: 'MusicCtrl'
    //        })
    //        //.state('tv', {
    //        //    url: '/tv',
    //        //    templateUrl: 'templates/tv.html',
    //        //    controller: 'TVCtrl'
    //        //})
    //        //.state('movies', {
    //        //    url: '/movies',
    //        //    templateUrl: 'templates/movies.html',
    //        //    controller: 'MoviesCtrl'
    //        //})
    //
    //    $urlRouterProvider.otherwise('/music');
    //});
