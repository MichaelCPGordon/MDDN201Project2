angular.module('services.account', [])

    .factory('AccountService', function(){

        var account = {
            firstName: "Jason",
            lastName: "Bower",
            email: "jason.bower@gmail.com",
            phone: "02112349876"
        };

        var serviceFunctions = {

            getAccountDetails: function(){
                return account;
            },

            updateAccountDetails: function(acc){
                account = acc;
            }
        };

        return serviceFunctions;

    });