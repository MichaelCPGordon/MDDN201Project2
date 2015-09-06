angular.module('controllers.sideMenu', [])

    .controller('SideMenuCtrl', function($scope, MusicService, AccountService, $mdDialog, $rootScope){

        $scope.selectedMediaType = "music";

        $scope.music = {
            queue: MusicService.getQueue()
        };

        $scope.account = AccountService.getAccountDetails();

        $rootScope.$on("updateAccountDetails", function(){
            $scope.account = AccountService.getAccountDetails();
        });










        $scope.status = '  ';


        $scope.showSettings = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/settingsDialog.html',
                parent: angular.element(document.body),
                focusOnOpen: true,
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

        function DialogController($scope, $mdDialog, AccountService, $rootScope) {

            $scope.account = angular.copy(AccountService.getAccountDetails());

            $scope.hide = function() {
                AccountService.updateAccountDetails($scope.account);
                $rootScope.$broadcast("updateAccountDetails");
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $rootScope.$broadcast("updateAccountDetails");
                $mdDialog.cancel();
            };
        }











    });