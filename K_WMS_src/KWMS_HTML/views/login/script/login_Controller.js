angular.module('app')
    .controller('LoginCtrl', ['$scope', "$state",
        function($scope, $state) {
            // $scope.app.name = document.title = "润和-HopeRun";
            $scope.event = {
                Login: function() {
                    $state.go("app.StoreHouseManage");
                }
            }
        }
    ]);
