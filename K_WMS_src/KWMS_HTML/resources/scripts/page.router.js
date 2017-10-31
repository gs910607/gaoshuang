'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/Login');
            $stateProvider
                /*登录*/
                .state('Login', {
                    url: '/Login',
                    templateUrl: 'views/login/login.html',
                    controller:"LoginCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['views/login/script/login_controller.js']);
                            }
                        ]
                    }
                })
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'views/layout/index.html'
                })
                .state('app.main', {
                    url: '/Main',
                    templateUrl: 'views/main.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                // return $ocLazyLoad.load(['resources/scripts/js/controllers/chart.js']);
                            }
                        ]
                    }
                })
                .state('app.StoreHouseManage', {
                    url: '/StoreHouseManage',
                    templateUrl: 'views/StoreHouseManage/StoreHouse.html',
                    controller:"StoreHouseCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['views/StoreHouseManage/script/StoreHouse_controller.js']);
                            }
                        ]
                    }
                })
        }
    ]);
