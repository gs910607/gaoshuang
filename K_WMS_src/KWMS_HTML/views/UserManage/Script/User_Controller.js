//人组管理
app.controller('GroupUserOperateCtrl', function($scope, UserService, $modal, Dialog, service) {
    $scope.eventName = {
        PersonTagBtn: "基础标签"
    }
    $scope.Page = {
        Index: 1,
        Count: 10
    }
    $scope.data = [{
        Name:"陈聪",
        Sex:"男"
    },{
        Name:"贾飞",
        Sex:"男"
    }]
    $scope.event = $.extend($scope.event, {
        Add: function(data) {
            Dialog.Show('/views/UserManage/Useroperate.html', 'UserOperateCtrl', 'lg', {
            }, function(result) {
                $scope.data.push(result)
            })
        },
        Edit:function(data){
            Dialog.Show('/views/UserManage/Useroperate.html', 'UserOperateCtrl', 'lg', {
                data:function(){
                    return data;
                }
            }, function(result) {
                $scope.data.push(result)
            })
        }
    });
});
//导入模板
app.controller('GroupInputCtrl', function($scope, $modalInstance, UserService, service) {
    $scope.data = [];
    $scope.Attach = {};
    $scope.ossUpload = FileUpload.BuildUploadObj();
    $scope.event = {
        Close: function() {
            $modalInstance.close(true);
        },
        Delete: function(row) {
            if (!row.state) { //未上传,从列表里删除
                $scope.data.splice($.inArray(row, $scope.data), 1);
            } else { //上传,从数据库删除
                service.msg.alert("已上传,不能移除!")
            }
        },
        Upload: function(row) {
            var GUID = FileUpload.BuildGUID();
            $scope.ossUpload.upload(FileUpload.BuildUploadSetting(row, 'Upload/Import/' + GUID, function(res) {
                $scope.$apply(function() {
                    row.state = true;
                    row.StateName = "已上传"
                    row.Id = GUID;
                });
                $.extend($scope.Attach, {
                    FileId: GUID + row.Extension,
                    state: row.state,
                    FileName: row.name,
                    SavePath: 'Upload/Import/',
                    Size: row.size
                });
                UserService.PostGroupUser($scope, $scope.Attach, function(data) {

                });
            }, function(res) {
                console.log("上传失败！");
                row.state = false;
                row.StateName = "上传失败"
            }));
        },
        UploadAll: function() {
            $scope.data.filter(function(obj) {
                return !obj.state
            }).map(function(obj) {
                $scope.event.Upload(obj)
                return true;
            })
        },
        FileChange: function() {}
    };
    $('body').delegate('#files', 'change', function(evt) {
        var fileTotal = evt.target.files;
        angular.forEach(fileTotal, function(obj, index) {
            obj.FileName = obj.name;
            obj.StateName = "未上传"
            obj.Extension = obj.name.substr(obj.name.lastIndexOf('.'));
            obj.Size = obj.size;
            $scope.$apply(function() {
                $scope.data.push(obj);
            })
        });
    });
});
//导入历史
app.controller('ImportOperateCtrl', function($scope, UserService, Dialog) {
    $scope.Page = {
        Index: 1,
        Count: 1
    }
    $scope.event = {
        LoadData: function() {
            UserService.GetImportList($scope, {
                PageIndex: $scope.Page.Index
            }, function(data) {
                $scope.data = data.List;
                if ($scope.Page.Index != 1) return;
                $scope.Page.Count = data.Num;
            });
        },
        SearchView: function(row) {
            window.open(row.Url)
        }
    };
    $scope.event.LoadData();
});
//添加人员
app.controller('OperateUserCtrl', function($scope, $modal, $modalInstance, UserService, Dialog) {
    $scope.model = {};
    $scope.Base = {};
    $scope.PostData = {
        GroupUsers: []
    }
    $scope.AccountType = [{
        KeyType: 0,
        KeyName: "手机号"
    }, {
        KeyType: 1,
        KeyName: "身份证"
    }];
    $scope.SexType = [{
        GroupUserGender: 0,
        GroupUserGenderName: "男"
    }, {
        GroupUserGender: 1,
        GroupUserGenderName: "女"
    }, {
        GroupUserGender: -1,
        GroupUserGenderName: "其他"
    }];
    $scope.event = {
        Close: function() {
            $modalInstance.close();
        },
        Save: function() {
            for (obj in $scope.steps) {
                if ($scope.steps[obj]) {
                    switch (obj) {
                        case "step1":
                            UserService.PostUserBaseInfo($scope, null, function(data) {
                                $scope.UserId = data;
                                $scope.steps.step2 = true;
                            });
                            break;
                        case "step2":
                            var GroupUsers = [];
                            $scope.data.map(function(obj) {
                                GroupUsers.push({
                                    GroupRelationId: obj.Id,
                                    UserId: $scope.UserId,
                                    GroupUserPhoto: "",
                                    GroupUserGender: obj.GroupUserGender,
                                    GroupUserName: obj.GroupUserName
                                })
                                return GroupUsers;
                            })
                            UserService.PostGroupUsers($scope, GroupUsers, function(data) {
                                $scope.steps.step3 = true;
                            });
                            break;
                        case "step3":
                            var GroupUserValidCodes = [];
                            angular.forEach($scope.data, function(obj, index) {
                                GroupUserValidCodes.push({
                                    GroupRelationId: obj.Id,
                                    UserId: $scope.UserId || obj.UserId,
                                    ValidCode: $scope.model.VipCode,
                                    TwoD: "",
                                    DtoObjOperation: 0
                                })
                            });
                            UserService.PostGroupUserValidCodes($scope, GroupUserValidCodes, function(data) {
                                $modalInstance.close(data);
                            });
                            break;
                        default:
                            return;
                            break;
                    }
                }
            }
        },
        //点击所属部门表格行加载不同信息
        RowClick: function(row, index) {
            $scope.SelectNode = row;
        },
        Delete: function(row) {
            $scope.data.splice($.inArray(row, $scope.data), 1);
        }
    }
    $scope.GridEvent = {
        //添加部门
        SelectNode: function() {
            Dialog.Show('/views/UserManage/SelectDept.html', 'SelectDeptCtrl', 'md', {}, function(result) {
                if (result) {
                    $scope.data = result.filter(function(x) {
                        if (!x.isParent) {
                            return x;
                        }
                    });
                    $scope.SelectNode = $scope.data[0];
                }
            })
        }
    }
});
//编辑人员
app.controller('EditUserCtrl', function($scope, $modal, $modalInstance, UserService, Dialog, UserInfo) {
    $scope.UserInfo = UserInfo;
    $scope.SexType = [{
        GroupUserGender: 0,
        GroupUserGenderName: "男"
    }, {
        GroupUserGender: 1,
        GroupUserGenderName: "女"
    }, {
        GroupUserGender: -1,
        GroupUserGenderName: "保密"
    }];
    $scope.event = {
        Close: function() {
            $modalInstance.close();
        },
        Save: function(item) {
            $scope.data;
            UserService.PutGroupUsersNameAndSex($scope, $scope.data, function() {

            });
            $modalInstance.close(true);
        },
        //点击所属部门表格行加载不同信息
        RowClick: function(row) {
            $scope.SelectNode = row;
        },
        LoadData: function() {
            UserService.GetGroupUsersByUserId($scope, $scope.UserInfo, function(data) {
                $scope.data = data;
                $scope.model = $scope.data[0];
            });
        }
    }
    $scope.event.LoadData();
});
//打标签
app.controller('SetPersonTagCtrl', function($scope, $modal, $modalInstance, UserService, Dialog) {
    $scope.model = {};
    $scope.event = {
        Save: function() {
            $modalInstance.close($scope.model.Operations);
        },
        Close: function() {
            $modalInstance.close();
        }
    };
    UserService.GetGeneralTaggings($scope, null, function(data) {
        $scope.PersonalTag = data;
    })
});
//设置Vip
app.controller('SetVipCtrl', function($scope, $modal, $modalInstance, UserService, Dialog) {
    $scope.event = {
        Save: function() {
            $modalInstance.close($scope.model.VipCode);
        },
        Close: function() {
            $modalInstance.close();
        }
    }
})
app.controller('SelectDeptCtrl', function($scope, $modalInstance, DeptmentService) {
    $scope.event = $.extend($scope.event, {
        Save: function() {
            var halfCheck = undefined;
            var FilterOperations = [];
            var CheckedOperations = $scope.tree.getCheckedNodes(true);
            angular.forEach(CheckedOperations, function(obj, index) {
                halfCheck = obj.getCheckStatus();
                if (!halfCheck.half) {
                    FilterOperations.push(obj)
                }
            });
            $modalInstance.close(FilterOperations);
        },
        Close: function() {
            $modalInstance.close();
        }
    });
})
app.controller('GroupEditCtrl', function($scope, $modalInstance, service, UserService, SelectNode, Operation) {
    $scope.SelectNode = SelectNode;
    $scope.model = {};
    $scope.Operation = Operation;
    if ($scope.Operation !== "Add") {
        $scope.model.Name = $scope.SelectNode.GroupName;
        $scope.model.OrderIndex = $scope.SelectNode.OrderIndex;
    } else {
        $scope.model.GroupName = $scope.SelectNode.GroupName;
    }
    $scope.event = {
        Save: function() {
            if ($scope.Operation === "Add") {
                UserService.PostGroupRelationBaseInfo($scope, $scope.SelectNode, function(data) {
                    var CloseData = {
                        GroupName: $scope.model.Name,
                        Id: data,
                        ParentId: $scope.SelectNode.Id
                    }
                    $modalInstance.close(CloseData);
                });
            } else { //编辑
                UserService.PutGroupRelationBaseInfo($scope, $scope.SelectNode, function(data) {
                    $modalInstance.close($scope.model);
                });
            }
        },
        Close: function() {
            $modalInstance.close();
        }
    }
})
