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
        var userInfo  = getUser(),
            countries = [
                {id: 180, name: 'Romania'},
                {id: 2, name: 'USA'}
            ];
        $scope.user = userInfo;

        var formCtrl        = $('#profile-form'),
            firstNameCtrl   = formCtrl.find('#ebFirstNameCtrl'),
            lastNameCtrl    = formCtrl.find('#ebLastName'),
            countryCtrl     = formCtrl.find('#sltCountries'),
            cityCtrl        = formCtrl.find('#ebCity'),
            addressCtrl     = formCtrl.find('#ebAddress'),
            okMessageCtrl   = formCtrl.find('.w-form-done'),
            failMessageCtrl = formCtrl.find('.w-form-fail');

        var options = '';
        for (var i = 0; i < countries.length; i++) {
            options += '<option value="' + countries[i].id + '">' + countries[i].name + '</option>';
        }

        countryCtrl.html(options);
        countryCtrl.val(userInfo.country_id);

        $scope.save = function () {
            var allOk = true;

            if (firstNameCtrl.val() == '') {
                firstNameCtrl.addClass('required');
                allOk = false;
            } else {
                firstNameCtrl.removeClass('required');
            }

            if (lastNameCtrl.val() == '') {
                lastNameCtrl.addClass('required');
                allOk = false;
            } else {
                lastNameCtrl.removeClass('required');
            }

            if (countryCtrl.val() == '') {
                countryCtrl.addClass('required');
                allOk = false;
            } else {
                countryCtrl.removeClass('required');
            }

            if (cityCtrl.val() == '') {
                cityCtrl.addClass('required');
                allOk = false;
            } else {
                cityCtrl.removeClass('required');
            }

            if (addressCtrl.val() == '') {
                addressCtrl.addClass('required');
                allOk = false;
            } else {
                addressCtrl.removeClass('required');
            }

            if (allOk) {
                $.ajax({
                    type: 'GET',
                    url: 'http://www.myaccount.dev/api/shoppers-update/' + userInfo.id,
                    dataType: 'json',
                    data: {
                        username: userInfo.email,
                        firstName: firstNameCtrl.val(),
                        lastName: lastNameCtrl.val(),
                        country: countryCtrl.val(),
                        city: cityCtrl.val(),
                        address: addressCtrl.val()
                    },
                    success: function (data) {
                        userInfo = data;
                        localStorage.setItem('user', JSON.stringify(data));
                        okMessageCtrl.show();
                    },
                    error: function () {
                        failMessageCtrl.show();
                    }
                });
            }
        };
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
    });
