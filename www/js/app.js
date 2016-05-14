// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'jett.ionic.filter.bar', 'ngCordova', 'ionic-native-transitions'])

    .run(['$ionicPlatform', '$cordovaToast', '$cordovaContacts', function ($ionicPlatform) {
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

            var push = new Ionic.Push({
                debug: true,
                onNotification: function (notification) {
                    // this function will be called when your device receives a notification, and provided with the notification object received.
                    var payload = notification.payload;
                    console.log(notification, payload);
                },
                onRegister: function (data) {
                    // This function will be called upon successful registration of your device,
                    // and provided with a data argument that contains a token string with your device token.

                    console.log(data);
                },
                pluginConfig: {
                    ios: {
                        badge: true,
                        sound: true
                    },

                    android: {
                        iconColor: "#ff3333"
                    }
                }
            });

            push.register(function(token) {
                console.log(token.token);
                //alert(["Device token: ", token.token]);
                push.saveToken(token);  // persist the token in the Ionic Platform
            });
        });
    }])
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
            .state('app.settings', {
              url  : '/settings',
              views: {
                'menuContent': {
                  templateUrl: 'templates/settings.html',
                  controller : 'SettingsCtrl'
                }
              }
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/products');
    });
