app
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('Yum.UserManage', {
				url: '/User',
				templateUrl: '/views/Layout/Default.html',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load('ui.select').then(function() {
								return $ocLazyLoad.load([
									'/Views/UserManage/Script/User_Service.js',
									'/Views/UserManage/Script/User_Controller.js'
									// '/Views/DeptmentManage/Script/Deptment_Service.js'
								]);
							});
						}
					]
				}
			})
			.state('Yum.GroupUser', {
				url: '/GroupUser',
				templateUrl: '/views/Layout/Default.html',
				resolve: {
					deps: ['$ocLazyLoad',
						function($ocLazyLoad) {
							return $ocLazyLoad.load('ui.tree').then(function() {
								return $ocLazyLoad.load([
									'/Views/UserManage/Script/User_Service.js',
									'/Views/demo/Script/demo_controller.js',
									'/Views/UserManage/Script/User_Controller.js'
									// '/Views/Authority/AccountManage/Script/Account_Service.js',
									// '/Views/DeptmentManage/Script/Deptment_Controller.js',
									// '/Views/DeptmentManage/Script/Deptment_Service.js'
								]);
							});
						}
					]
				}
			})
			.state("Yum.UserManage.User", {
				url: '/User',
				templateUrl: '/views/UserManage/GroupUserOperate.html',
				controller: 'GroupUserOperateCtrl'
			})
			//标签管理
			.state("Yum.GroupUser.Import", {
				url: '/ImportOperate',
				templateUrl: '/views/UserManage/ImportOperate.html',
				controller: "ImportOperateCtrl"
			})
			//导入历史
			.state("Yum.GroupUser.Tag", {
				url: '/TagOperate',
				templateUrl: '/views/UserManage/TagOperate.html',
				controller: "TagOperateCtrl"
			})
			.state("Yum.GroupUser.UserOperate", {
				url: '/UserOperate',
				templateUrl: '/views/UserManage/UserOperate.html',
				controller: "UserOperateCtrl"
			})
	});
