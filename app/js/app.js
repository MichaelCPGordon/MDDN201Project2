
angular.module('app', [
    'ngMaterial',
    'controllers.music',
    'services.music',
    'services.account'
])

.config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('blue');
});
