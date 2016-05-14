// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'jett.ionic.filter.bar', 'ngCordova', 'ionic-native-transitions'])

    .run(['$ionicPlatform', '$cordovaToast', '$cordovaContacts', '$rootScope', '$state', '$ionicPopup', function ($ionicPlatform, $cordovaToast, $cordovaContacts, $rootScope, $state, $ionicPopup) {
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
                "debug": true,
                canShowAlert: true, //Can pushes show an alert on your screen?
                canSetBadge: true, //Can pushes update app icon badges?
                canPlaySound: true, //Can notifications play a sound?
                canRunActionsOnWake: true, //Can run actions outside the app,

                "onNotification": function (notification) {
                    // this function will be called when your device receives a notification, and provided with the notification object received.
                    var payload = notification.payload;

                    if (payload.productCode) {
                        var confirmPopup = $ionicPopup.confirm({
                            title: notification.text,
                            template: payload.description
                        });

                        confirmPopup.then(function(res) {
                            if(res) {
                                $state.go('app.single', {'productCode':payload.productCode});
                            }
                        });
                    }

                    return true;
                },

                "onRegister": function (data) {
                    // This function will be called upon successful registration of your device,
                    // and provided with a data argument that contains a token string with your device token.

                    //console.log(data);
                }

                //"pluginConfig": {
                //    ios: {
                //        alert: true,
                //        badge: true,
                //        sound: true
                //    },
                //
                //    android: {
                //        iconColor: "#ff3333"
                //    }
                //}
            });

            push.register(function (token) {
                //console.log({
                //    username: email,
                //    token: token._token
                //});

                //alert(["Device token: ", token.token]);
                push.saveToken(token);  // persist the token in the Ionic Platform
            });

            $rootScope.$on('login-success', function(event, args) {
                email = args.email;

                push.register(function (token) {
                    //console.log({
                    //    username: email,
                    //    token: token._token
                    //});

                    //alert(["Device token: ", token.token]);
                    push.saveToken(token);  // persist the token in the Ionic Platform

                    $.ajax({
                        type: 'GET',
                        url: 'http://ec2-52-50-67-73.eu-west-1.compute.amazonaws.com/api/devices',
                        dataType: 'json',
                        data: {
                            username: email,
                            token: token._token
                        },
                        success: function (data) {
                            console.log('register token response:');
                            console.log(data);
                        }
                    });
                });
            });
        });

        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            var currentRoute = next.split('#');
            currentRoute     = currentRoute[1];

            var title   = '',
                showNav = true;

            switch (currentRoute) {
                case '/app/profile':
                {
                    title = 'Profile';
                    break;
                }
                case '/app/products':
                {
                    title = 'My Subscriptions';
                    break;
                }
                case '/app/cards':
                {
                    title = 'My cards';
                    break;
                }
                case '/app/login':
                {
                    title = 'Login';
                    showNav = false;
                    break;
                }
                case '#/app/products/1':
                case '#/app/products/2':
                {
                    title = 'Subscription';
                    showNav = false;
                    break;
                }
                default: {
                    showNav = false;
                }
            }

            if (showNav) {
                $('#main-nav').removeClass('hide');
            } else {
                $('#main-nav').addClass('hide');
            }

            $('#page-title').html(title);
        });
    }])
    .config(function ($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/content.html',
                controller: 'AppCtrl'
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
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
                url: '/products',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/products.html',
                        controller: 'ProductsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/products/:productCode',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/product.html',
                        controller: 'ProductCtrl'
                    }
                }
            })
            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })
            .state('app.cards', {
              url  : '/cards',
              views: {
                'menuContent': {
                  templateUrl: 'templates/cards.html',
                  controller : 'CardsCtrl'
                }
              }
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
    });
