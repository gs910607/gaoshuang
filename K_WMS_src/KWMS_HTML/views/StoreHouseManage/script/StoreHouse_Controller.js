app.controller('StoreHouseCtrl', ["$scope", "$state", "service", "ngDialog",
    function($scope, $state, service, ngDialog) {
        $scope.Page = {
            Index: 1,
            Count: 10
        }
        $scope.data = [];
        $scope.event = {
            edit: function(row) {
                service.http.ajax({
                    model: "wareHouse",
                    fun: "queryWareHouseInfoByGuid",
                    data: { guid: row.guid },
                    success: function(data) {
                        var modal = ngDialog.open({
                            resolve: {
                                model: function() {
                                    return data;
                                }
                            },
                            scope: $scope,
                            width: 700,
                            templateUrl: "views/StoreHouseManage/StoreHouseOperate.html",
                            controller: "StoreHouseOperateCtrl",
                            showClose: false,
                            closeByEscape: false,
                            closeByDocument: false
                        })
                        modal.closePromise.then(function(result) {
                            if (result.value) {
                                $scope.event.LoadData();
                            }
                        });
                    }
                });
                // console.dir(row);
            },
            LoadData: function() {
                service.http.ajax({
                    model: "wareHouse",
                    fun: "queryWareHouseInfo",
                    data: { pageSize: $scope.Page.Size || service.PageSize, pageNo: $scope.Page.Index },
                    success: function(data) {
                        $scope.Page.Count = data.count;
                        $scope.data = data.wareHouseList;
                    }
                })
            }
        };
        $scope.event.LoadData();
    }
]);
app.controller('StoreHouseOperateCtrl', ["$scope", "$state", "service", "ngDialog", "model",
    function($scope, $state, service, ngDialog, model) {
        var list = ngDialog.getOpenDialogs();
        var list_id = list[list.length - 1];
        $scope.model = model;
        $scope.event = {
            OK: function() {
                service.http.ajax({
                    model: "wareHouse",
                    fun: "updateWareHouseInfoByGuid",
                    data: $scope.model,
                    success: function(data) {
                        ngDialog.close(list_id, true);
                    }
                });
            },
            Close: function() {
                ngDialog.close(list_id);
            }
        }
    }
]);
