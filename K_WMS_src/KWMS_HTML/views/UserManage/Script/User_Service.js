app
	.factory('UserService', function($http, service, DataOperate) {
		var ret = {
			DeleteInfo: function($scope, data, fun) {
				DataOperate.Delete(Route.User_DeleteUser, data, function(data) {
					if (fun) fun(data);
				})
			},
			//导入历史
			GetImportList: function($scope, data, fun) {
				DataOperate.LoadData(Route.Import_GetImportList, {
					adduserId: service.Cookie.Get("UserID"),
					groupRelationId: service.GuidNull,
					appId: service.Cookie.Get("AppID"),
					pageIndex: data.PageIndex,
					pageSize: data.PageSize || service.PageSize
				}, function(data) {
					if (fun) fun(data);
				})
			},
			PostGroupUser: function ($scope, data, fun) {
				DataOperate.Save(Route.Import_PostGroupUser, {
					operUserId: service.Cookie.Get("UserID"),
					operUserName: service.Cookie.Get("UserName"),
					groupRelationId: service.GuidNull,
					groupRelationName: "",
					appId: service.Cookie.Get("AppID"),
					fileId: data.FileId,
					fileName: data.FileName
				}, function(data) {
					if (fun) fun(data);
				})
			},
			LoadData: function($scope, data, fun) {
				DataOperate.LoadData(Route.GroupUser_GetUsersByGroupId, {
					groupRelationId: $scope.S_TreeNode.FK_GroupRelationId
				}, function(data) {
					$scope.data = data;
					if (fun) fun(data);
				})
			},
			//修改群组信息
			PutGroupUsersNameAndSex: function($scope, data, fun) {
				DataOperate.Edit(Route.GroupUserWrapper_PutGroupUsersNameAndSex, {
					GroupUsers: data,
					AppId: service.Cookie.Get("AppID"),
					OperUserId: service.Cookie.Get("UserID"),
					AccountType: 5,
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//打基础标签
			PutGroupUserTaggings: function($scope, data, fun) {
				DataOperate.Add(Route.GroupUserWrapper_PutGroupUserTaggings, {
					GroupUsers: data.GroupUsers,
					Taggings: data.Taggings,
					AppId: service.Cookie.Get("AppID"),
					OperUserId: service.Cookie.Get("UserID"),
					AccountType: 5,
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//根据人的id获取所在组的信息
			GetGroupUsersByUserId: function($scope, data, fun) {
				DataOperate.LoadData(Route.GroupUserWrapper_GetGroupUsersByUserId , {
					userId: data.UserId,
					operUserId: service.Cookie.Get("UserID"),
					accountType: 5,
					appId: service.Cookie.Get("AppID")
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//删除群组中的人员
			DeleteGroupUser: function($scope, data, fun) {
				DataOperate.Delete(Route.GroupUserWrapper_DeleteGroupUser, {
					groupRelationId: data.GroupRelationId,
					userId: data.UserId,
					operUserId: service.Cookie.Get("UserID"),
					accountType: 5,
					appId: service.Cookie.Get("AppID")
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//删除组
			DeleteGroupRelationBaseInfo: function($scope, data, fun) {
				DataOperate.Delete(Route.GroupRelationWrapper_DeleteGroupRelationBaseInfo, {
					groupRelationId: data.Id,
					operUserId: service.Cookie.Get("UserID"),
					accountType: 5,
					appId: service.Cookie.Get("AppID")
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//添加组
			PostGroupRelationBaseInfo: function($scope, data, fun) {
				DataOperate.Add(Route.GroupRelationWrapper_PostGroupRelationBaseInfo, {
					GroupRelation: {
						ParentGroupId: data.GroupId,
						ParentId: data.Id,
						GroupRelationBorderId: data.GroupRelationBorderId,
						GroupName: $scope.model.Name,
						OrderIndex: $scope.model.OrderIndex,
						GroupPhoto: "",
						GroupRelationExAttributes: null,
						GroupRelationTaggings: null,
						GroupUsers: null
					},
					AppId: service.Cookie.Get("AppID"),
					OperUserId: service.Cookie.Get("UserID"),
					AccountType: 5,
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//修改组
			PutGroupRelationBaseInfo: function($scope, data, fun) {
				$scope.SelectNode.GroupName = $scope.model.Name;
				DataOperate.Edit(Route.GroupRelationWrapper_PutGroupRelationBaseInfo, {
					GroupRelation: $scope.SelectNode,
					AppId: service.Cookie.Get("AppID"),
					OperUserId: service.Cookie.Get("UserID"),
					AccountType: 5,
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//添加人员基础信息
			PostUserBaseInfo: function($scope, data, fun) {
				DataOperate.Add(Route.UserWrapper_PostUserBaseInfo, {
					User: {
						Key: $scope.model.Key,
						KeyType: $scope.model.KeyType
					},
					OperUserId: service.Cookie.Get("UserID"),
					AccountType: 5,
					AppId: service.Cookie.Get("AppID")
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//添加Vip码
			PostGroupUserValidCodes: function($scope, data, fun) {
				DataOperate.Add(Route.GroupUserWrapper_PostGroupUserValidCodes, {
					GroupUserValidCodes: data,
					OperUserId: service.Cookie.Get("UserID"),
					AccountType: 5,
					AppId: service.Cookie.Get("AppID")
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//添加群组中的人
			PostGroupUsers: function($scope, data, fun) {
				DataOperate.Add(Route.GroupUserWrapper_PostGroupUsers, {
					GroupUsers: data,
					OperUserId: service.Cookie.Get("UserID"),
					AccountType: 5,
					AppId: service.Cookie.Get("AppID")
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//获取标签
			GetGeneralTaggings: function($scope, data, fun) {
				DataOperate.LoadData(Route.TaggingWrapper_GetGeneralTaggings, {
					operUserId: service.Cookie.Get("UserID"),
					appId: service.Cookie.Get("AppID"),
					accountType: 5
				}, function(data) {
					if (fun) fun(data);
				})
			},
			//加载组中人员
			GetGridData: function($scope, data, fun) {
				DataOperate.LoadData(Route.GroupUserWrapper_GetGroupUsers, {
					groupRelationId: data.Id,
					pageIndex: $scope.Page.Index,
					pageSize: 99 || service.PageSize,
					phone: "",
					name: "",
					groupUserTagIds: "",
					operUserId: service.Cookie.Get("UserID"),
					accountType: 5,
					appId: service.Cookie.Get("AppID"),
					bDeep: false
				}, function(data) {
					if (fun) fun(data);
				})
			},
			LoadInfo: function($scope, data, fun) {
				if (data.item) { //编辑
					DataOperate.LoadData(Route.User_GetUserInfo, {
						// userId: data.item.UserAttribute.FK_UserId
					}, function(data) {
						if (fun) fun(data);
					})
				} else { //添加
					
				}
			}
		};
		return ret;
	});