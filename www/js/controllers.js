
angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($rootScope, $scope, $state) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $rootScope.loginData  = {};
        $rootScope.showHeader = true;
        $rootScope.checkLogin = function () {
            //localStorage.removeItem('user');
            var userInfo = localStorage.getItem('user');
            if (!userInfo) {
                $state.go('app.login');
                return false;
            } else {
                userInfo = JSON.parse(userInfo);
                return true;
            }
        };
    })

    .controller('ProductsCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
        if (!$rootScope.checkLogin()) {
            return;
        }

        $('#main-nav').show();
        $('#page-title').html('My Subscriptions');

        var userInfo = getUser();
        $.ajax({
            type: 'GET',
            url: 'http://www.myaccount.dev/api/subscriptions',
            dataType: 'json',
            data: {
               username: userInfo.email
            },
            success: function (data) {
                $scope.products = data;
            }
        });
    }])

    .controller('ProductCtrl', ['$rootScope', '$scope', '$stateParams', function ($rootScope, $scope, $stateParams) {
        if (!$rootScope.checkLogin()) {
            return;
        }

        $('#main-nav').show();
        $('#page-title').html('Subscription');

        var userInfo = getUser();
        $.ajax({
            type: 'GET',
            url: 'http://www.myaccount.dev/api/subscriptions/' + $stateParams.productCode,
            dataType: 'json',
            data: {
                username: userInfo.email
            },
            success: function (data) {
                $('#page-title').html(data.name);
                $scope.product = data;
            }
        });
    }])

    .controller('ProfileCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
        var userInfo = getUser();
        $scope.user = userInfo;
        $scope.save = function () {
            var formCtrl     = $('#profile-form'),
                firstNameCtrl = formCtrl.find('#ebFirstNameCtrl'),
                allOk        = true;

            if (!isEmailAddress(emailCtrl.val())) {
                emailCtrl.addClass('required');
                allOk = false;
            } else {
                emailCtrl.removeClass('required');
            }

            if (passwordCtrl.val() == '') {
                passwordCtrl.addClass('required');
                allOk = false;
            } else {
                passwordCtrl.removeClass('required');
            }

            if (allOk) {
                $.ajax({
                    type: 'GET',
                    url: 'http://www.myaccount.dev/api/login',
                    dataType: 'json',
                    data: {
                        username: emailCtrl.val(),
                        password: passwordCtrl.val()
                    },
                    success: function (data) {
                        localStorage.setItem('user', JSON.stringify(data));
                        $state.go('app.products');
                    }
                });
            }
        };
        console.log(userInfo)
    }])

    .controller('LoginCtrl', function ($rootScope, $scope, $state) {
        $rootScope.showHeader = false;
        $('#main-nav').hide();
        $scope.login = function () {

            var formCtrl     = $('#login-form'),
                emailCtrl    = formCtrl.find('#ebEmail'),
                passwordCtrl = formCtrl.find('#ebPassword'),
                allOk        = true;

            if (!isEmailAddress(emailCtrl.val())) {
                emailCtrl.addClass('required');
                allOk = false;
            } else {
                emailCtrl.removeClass('required');
            }

            if (passwordCtrl.val() == '') {
                passwordCtrl.addClass('required');
                allOk = false;
            } else {
                passwordCtrl.removeClass('required');
            }

            if (allOk) {
                $.ajax({
                    type: 'GET',
                    url: 'http://www.myaccount.dev/api/login',
                    dataType: 'json',
                    data: {
                        username: emailCtrl.val(),
                        password: passwordCtrl.val()
                    },
                    success: function (data) {
                        localStorage.setItem('user', JSON.stringify(data));
                        $state.go('app.products');
                    }
                });
            }
        };

        console.log('aici');
    });
