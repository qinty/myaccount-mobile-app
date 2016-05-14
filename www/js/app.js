// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'jett.ionic.filter.bar', 'ngCordova', 'ionic-native-transitions'])

    .run(['$ionicPlatform', '$cordovaToast', '$cordovaContacts', '$rootScope', function ($ionicPlatform, $cordovaToast, $cordovaContacts, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            // var push = new Ionic.Push({
            //     "debug": true
            // });
            //
            // push.register(function(token) {
            //     console.log("Device token:",token.token);
            //     //alert(["Device token: ",token.token]);
            //     push.saveToken(token);  // persist the token in the Ionic Platform
            // });
        });

        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            var currentRoute = next.split('#');
            currentRoute = currentRoute[1];

            var title = '';
            switch (currentRoute) {
                case '/app/profile': {
                    title = 'Profile';
                    break;
                }
                case '/app/products': {
                    title = 'My Subscriptions';
                    break;
                }
                case '/app/cars': {
                    title = 'My cards';
                    break;
                }
                default: {

                }
            }

            $('#page-title').html(title);
            // handle route changes
        });
    }])
    .config(function($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url        : '/app',
                abstract   : true,
                templateUrl: 'templates/content.html',
                controller : 'AppCtrl'
            })

            .state('app.login', {
                url  : '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller : 'LoginCtrl'
                    }
                }
            })

            .state('app.browse', {
                url  : '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                },
                nativeTransitions: {
                    "type": "flip",
                    "direction": "up"
                }
            })
            .state('app.products', {
                url  : '/products',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/products.html',
                        controller : 'ProductsCtrl'
                    }
                }
            })

            .state('app.single', {
                url  : '/products/:productCode',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/product.html',
                        controller : 'ProductCtrl'
                    }
                }
            })
            .state('app.profile', {
              url  : '/profile',
              views: {
                'menuContent': {
                  templateUrl: 'templates/profile.html',
                  controller : 'ProfileCtrl'
                }
              }
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/products');
    });
