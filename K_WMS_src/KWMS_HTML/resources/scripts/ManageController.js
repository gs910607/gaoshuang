'use strict';
app
    .run(["$rootScope", "$state", "$stateParams", "service",
        function($rootScope, $state, $stateParams, service) {
            $rootScope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $rootScope.opened = true;
            };
            $rootScope.opened = true;
            $rootScope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                class: 'datepicker'
            };
        }
    ])
    .config(["$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('Web', {
                    abstract: true,
                    url: '/Web',
                    templateUrl: '/Web/Layout/index.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    '/Views/DataBaseManage/Script/DataBase_Service.js',
                                ]);
                            }
                        ]
                    },
                    controller: function($scope) {
                        $scope.GridColumnList = GridColumnList;
                    }
                })
                .state('GT', {
                    abstract: true,
                    url: '/GT',
                    templateUrl: '/Views/index.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load("ui.select").then(function() {
                                    return $ocLazyLoad.load([
                                        '/views/PowerManage/Script/Power_Service.js',
                                        '/views/AppManage/Script/App_Service.js',
                                        '/views/DataBaseManage/Script/DataBase_Service.js'
                                    ]);
                                });
                            }
                        ]
                    },
                    controller: function($scope, $state, service, PowerService, DataBaseService, AppService) {
                        AppService.GetAppDetail($scope, {}, function(data) {
                            $scope.app.name = document.title = data ? data.AppName : " ";
                        })
                        if (!service.Cookie.Get("UserName")) {
                            $state.go("Login");
                        }
                        PowerService.LoadUserOperationPermissions($scope, {}, function(data) {
                            $scope.MenuList = data;
                        })
                        DataBaseService.LoadPageData($scope, {
                            PageIndex: 1,
                            PageSize: 999
                        }, function(data) {
                            $scope.ReportList = data.List;
                        })
                        $scope.GridColumnList = GridColumnList;
                    }
                })
                .state('GT.Main', {
                    url: '/Main',
                    template: '<div></div>'
                })
        }
    ])
