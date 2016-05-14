angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($rootScope, $scope, $location) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $rootScope.showHeader = true;
        // Form data for the login modal
        $rootScope.loginData = {};

        $rootScope.checkLogin = function () {
            var userInfo = localStorage.getItem('user');
            if (!userInfo) {
                console.log('go to');
                $location.path("/app/login" );
                //$rootScope.modal.show();
            }
        };
    })

    .controller('ProductsCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
        $rootScope.checkLogin();
        //$scope.login();
        //console.log('aici')
        // $http({
        //     method: 'GET',
        //     url: 'http://shopping-cart.dev/api/products'
        // }).then(function successCallback(response) {
        //     console.log(response.data)
        //     // this callback will be called asynchronously
        //     // when the response is available
        // }, function errorCallback(response) {
        //     // called asynchronously if an error occurs
        //     // or server returns response with an error status.
        // });
    }])

    .controller('ProductCtrl', function ($scope, $stateParams) {
    })
    .controller('LoginCtrl', function ($rootScope, $scope) {
        $rootScope.showHeader = false;
        
        $scope.login = function () {
            
        };
        
        console.log('aici');
    });
