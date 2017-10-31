// var app = angular.module('PublicApp', ["UrlConfig"]);
app.run(function() {
    //获取菜单数据
    var id = Request("id") ? Request("id").substr(0, (Request("id") + "#").indexOf('#')) : 1; //获取页面请求参数:id

    // less.modifyVars({
    // 	'@public-color': Set.ThemeColor ? Set.ThemeColor : "#478cd0",
    // 	'@body-bgColor': Set.bodybgColor ? Set.bodybgColor : "white"
    // });
});
//-------------------------------------指令@表单控件------------------------------------
//富文本(wangEditor)
app
    .directive("richtextbox", function() {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            template: function(e, a) {
                var html;
                html = $('<div class="richtext"></div>');
                var textarea = $('<textarea id=' + (a.richtextid || 'textarea') + '></textarea>').appendTo(html);
                if (a.style) {
                    textarea.attr("style", a.style)
                }
                return html[0].outerHTML;
            },
            controller: function($scope, service) {
                $scope.ossUpload = service.FileUpload.BuildUploadObj();
                //生成imgDom
                function CreateImgDom(file) {
                    var windowURL = window.URL || window.webkitURL;
                    var $img = $('<img src="" alt="">');
                    $img.css({
                        'width': '70%',
                        'margin': '5px'
                    });
                    var Url = "http://" + $scope.ossUpload._config.bucket + "." + $scope.ossUpload._config.endpoint.host + "/" + file.SavePath + file.Id + file.Extension;
                    $img[0].src = Url;
                    $scope.editor.hideModal();
                    $scope.editor.append($img);
                }
                //上传
                var Upload = function(row) {
                    var GUID = service.FileUpload.BuildGUID();
                    $scope.ossUpload.upload(service.FileUpload.BuildUploadSetting(row, 'Upload/Import/' + GUID, function(res) {
                        $scope.tag = true;
                        $scope.$apply(function() {
                            row.state = true;
                            row.StateName = "已上传";
                            row.Id = GUID;
                            row.SavePath = 'Upload/Import/';
                        });
                        CreateImgDom(row);
                        console.log("上传成功！");
                    }, function(res) {
                        console.log("上传失败！");
                        row.state = false;
                        row.StateName = "上传失败"
                    }));
                }
                $('body').delegate('#files', 'change', function(evt) {
                    var file = evt.target.files[0];
                    file.Extension = file.name.substr(file.name.lastIndexOf('.'));
                    Upload(file)
                });
            },
            link: function($scope, element, attr, ngModel) {
                var $uploadContainer = $('#upload');
                $scope.editor = $('#' + (attr.richtextid || 'textarea')).wangEditor({
                    uploadImgComponent: $uploadContainer,
                    menuConfig: [
                        // ['viewSourceCode'],
                        ['bold', 'underline', 'italic', 'foreColor', 'backgroundColor', 'strikethrough'],
                        ['blockquote', 'fontFamily', 'fontSize', 'setHead', 'justify'],
                        ['createLink', 'insertTable', 'insertExpression'],
                        ['insertImage', 'insertLocation'],
                        ['undo', 'redo']
                    ],
                    onchange: function() {}
                });
                // $scope.editor.html('<p style="text-align: center;"><h1><ol><li><span style="line-height: 1.42857;"><b><font color="#880000">fdasgfad</font></b></span></li></ol></h1></p><img src="http://doc-gtintel.oss-cn-hangzhou.aliyuncs.com/Upload/Import/27811adc-9cd7-4c7d-8ec4-bb2c526da9f8.jpg" alt="" style="width: 70%; margin: 5px;">')
                element.css('margin-top', '20px');
            }
        }
    })
app
    .directive("fileinput", function() {
        return {
            restrict: "E",
            replace: true,
            // require:"ngModel",
            template: function(e, a) {
                var html;
                html = $('<div class="checkbox"></div>');
                var label = $('<Label class="i-checks i-checks-sm"></Label>').appendTo(html);
                label.text(a.value ? a.value : "");
                $("<i></i>").prependTo(label);
                var input = $('<input type="checkbox" ng-model="' + a.ngmodel + '" />').prependTo(label);
                if (a.ngchange) {
                    input.attr("ng-click", a.ngchange)
                }
                return html[0].outerHTML;
            },
            controller: function($scope, service) {},
            link: function($scope, element, attr, ngModel) {}
        }
    })
    .directive("checkbox", function() {
        return {
            restrict: "E",
            replace: true,
            // require:"ngModel",
            template: function(e, a) {
                var html = $('<div class="checkbox"></div>');
                var label = $('<Label class="i-checks i-checks-sm"></Label>').appendTo(html);
                if(a.inline){label.addClass("checkbox-inline")}
                label.text(a.value ? a.value : "");
                $("<i></i>").prependTo(label);
                var input = $('<input type="checkbox" ng-model="' + a.ngmodel + '" />').prependTo(label);
                input.attr({
                    "ng-click": a.ngchange || "",
                    "ng-disabled": a.ngdisabled || ""
                })
                html.append(e.context.innerHTML);
                return html[0].outerHTML;
            },
            controller: function($scope, service) {},
            link: function($scope, element, attr, ngModel) {}
        }
    })
    .directive("radio", function() {
        return {
            restrict: "E",
            replace: true,
            // require:"ngModel",
            template: function(e, a) {
                var html = $('<div class="radio"></div>');
                var label = $('<Label class="i-checks i-checks-sm"></Label>').appendTo(html);
                if(a.inline){label.addClass("checkbox-inline")}
                label.text(a.value ? a.value : "");
                $("<i></i>").prependTo(label);
                var input = $('<input type="radio" ng-model="' + a.ngmodel + '" />').prependTo(label);
                input.attr({
                    "ng-click": a.ngchange || "",
                    "ng-disabled": a.ngdisabled || "",
                    "name":a.name||""
                })
                html.append(e.context.innerHTML);
                return html[0].outerHTML;
            },
            controller: function($scope, service) {},
            link: function($scope, element, attr, ngModel) {}
        }
    })
    .directive("switch", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $('<label class="i-switch bg-info m-t-xs"></label>');
                html.addClass(a.class || "");
                var input = $('<input type="checkbox"/>').appendTo(html);
                input.attr("ng-model", a.ngmodel);
                $("<i></i>").appendTo(html);
                return html[0].outerHTML;
            }
        }
    })
    .directive("number", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var num = $('<input ui-jq="TouchSpin" type="number" value="0" class="form-control" ng-model=' + a.ngmodel + '>');

                num.attr({
                    "data-step": a.step || "1",
                    "data-decimals": a.decimals || "0",
                    "data-min": a.min || "0",
                    "data-max": a.max || "100"
                });
                if (a.buttonstyle === 'top') {
                    num.attr({
                        "data-verticalbuttons": true,
                        "data-verticalupclass": "fa fa-caret-up",
                        "data-verticaldownclass": "fa fa-caret-down"
                    });
                }
                if (a.typename) {
                    if (a.type == "l") {
                        num.attr("data-prefix", a.typename);
                    } else if (a.type == "r") {
                        num.attr("data-postfix", a.typename);
                    }
                }
                return num[0].outerHTML;
            }
        }
    })
    .directive("file", function() {
        return {
            restrict: "E",
            template: function(e, a) {
                return '<input ui-jq="filestyle" type="file" data-icon="false" data-classButton="btn btn-default" data-classInput="form-control inline v-middle input-s">';
            }
        }
    })
    .directive('dropdownlist', function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $('<div></div>');
                var dropdown = $('<ui-select theme="bootstrap" />').appendTo(html);
                dropdown.attr({
                    'ng-disabled': a.ngdisabled || "",
                    'on-select': a.onselect || "",
                    'ng-model': a.ngmodel,
                    'search-enabled': a.search
                });
                if (a.multiple || a.multiple === '') {
                    dropdown[0].attributes.setNamedItem(document.createAttribute('multiple'));
                }
                var match = $('<ui-select-match/>').appendTo(dropdown);
                match.attr({
                    'placeholder': a.placeholder
                }).html(a.display);

                var choices = $('<ui-select-choices/>').appendTo(dropdown);
                choices.attr('repeat', a.repeat);
                if (a.filter) {
                    var filterList = a.filter.split(',').map(function(x) {
                        return "'" + x + "': $select.search";
                    }).join(',');
                    var filter = ' | filter:{' + filterList + "}";
                    choices.attr('repeat', a.repeat + filter);
                }
                choices.html(e.context.innerHTML);

                if (a.tagging) {
                    dropdown.attr({
                        "tagging": a.tagging,
                        "tagging-label": "(自定义)",
                        "tagging-tokens": ",|/"
                    });
                    choices.prepend("<div ng-if=\"option.isTag\" ng-bind-html=\"option." + a.taggingValue + " + ' ' + $select.taggingLabel | highlight: $select.search\"></div>");
                }
                if (a.refresh) {
                    choices.attr({
                        'refresh': a.refresh,
                        'refresh-delay': 1000
                    })
                }
                return html[0].outerHTML;
            },
            controller: function($scope, DataBaseService) {
                $scope.DataBaseService = DataBaseService;
            },
            link: function($scope, e, a) {
                if (a.parentid) {
                    $scope.DataBaseService.GetDimensionalityTreeById($scope, {
                        FKDataSourceItemID: a.parentid,
                        Key: a.repeat
                    }, function(data) {
                        $scope[data.Key.split('in')[1].substr(1)] = data.data;
                    })
                }
            }
        }
    })
    .directive('progressmodel', function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var div = $('<div></div>');
                if (a.multiple || a.multiple == '') {
                    var progress = $('<progress></progress>').appendTo(div);
                    var bar = $('<bar></bar>').appendTo(progress);
                    bar.append('<span ng-hide="bar.value < 5">{{bar.value}}%</span>');
                    bar.attr({
                        'ng-repeat': 'bar in stacked track by $index',
                        'value': 'bar.value',
                        'type': '{{bar.type}}'
                    });
                    if (a.classname) {
                        progress.attr({
                            'class': a.classname
                        });
                    }
                } else {
                    var progressbar = $('<progressbar></progressbar>').appendTo(div);
                    progressbar.append(e[0].innerHTML);
                    progressbar.attr({
                        'value': a.value ? a.value : '',
                        'class': a.classname ? a.classname : '',
                        'type': a.styletype ? a.styletype : ''
                    });
                }
                return div[0].outerHTML;
            }
        }
    })
    .directive('sliderbar', function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var slider = $('<slider></slider>');
                var div = $('<div></div>');
                if (a.type == 'multiple') {
                    slider.attr('ng-model-range', a.rangemax);
                } else if (a.type == 'format') {
                    slider.attr('translate-fn', a.translatefn);
                }
                slider.attr({
                    'ng-model': a.rangemin,
                    'floor': a.floor,
                    'ceiling': a.ceiling
                });
                slider.appendTo(div);
                return div[0].outerHTML;
            }
        }
    })
    .directive('datetimepicker', function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $('<div class="input-group"></div>');
                var input = $('<input type="text" class="form-control" />').appendTo(html)
                input.attr({
                    'datepicker-popup': "yyyy-MM-dd",
                    'ng-model': a.ngmodel,
                    'is-open': "opened",
                    'min-date': a.mindate || "",
                    'max-date': a.maxdate || "",
                    'datepicker-options': "dateOptions",
                    'date-disabled': "disabled(date, mode)",
                    'ng-required': "true",
                    'close-text': "关闭"
                })
                html.append('<span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span>')
                return html[0].outerHTML;
            }
        }
    })
    .directive("textbox", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $('<input type="text" class="form-control"/>');
                if (a.required || a.required == '') {
                    html[0].attributes.setNamedItem(document.createAttribute('Required'));
                }
                if (a.type) {
                    html.attr("type", a.type);
                }
                if (a.placeholder) {
                    html.attr("placeholder", a.placeholder);
                }
                if (a.ngmodel) {
                    html.attr("ng-model", a.ngmodel);
                }
                if (a.disabled) {
                    html.attr("disabled", a.disabled);
                } else if (a.disabled == "") {
                    html.attr("disabled", a.disabled);
                }
                return html[0].outerHTML;
            },
            controller: function($scope) {}
        }
    })
    .directive("search", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $("<div class='input-group'/>");
                var text = $('<TextBox></TextBox>').appendTo(html);
                if (a.placeholder) {
                    text.attr("placeholder", a.placeholder);
                }
                if (a.ngmodel) {
                    text.attr("ngmodel", a.ngmodel);
                }
                $('<span class="input-group-addon input-sm"><i class="fa fa-search"></i></span>').appendTo(html);
                return html[0].outerHTML;
            },
            controller: function($scope) {}
        }
    })
    .directive("dropdowntreelist", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $('<div class="input-group"></div>');
                var input = $('<input type="text" class="form-control" disabled="disabled" />').appendTo(html)
                html.append('<span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="event.ConfigTree(\'' + a.parentid + '\')"><i class="fa fa-list"></i></button></span>')
                return html[0].outerHTML;
            },
            link: function($scope, e, a) {
                $scope.event = {
                    ConfigTree: function(param) {
                        Dialog.Show("/Views/DataBaseManage/SelectDataTree.html", "SelectDataTreeCtrl", "sm", {
                            ParentID: function() {
                                return a.parentid;
                            },
                            SelectType: function() {
                                return "radio";
                            },
                            SelectData: function() {
                                return param.SelectedItem;
                            }
                        }, function(result) {
                            if (result) {
                                // = result
                            }
                        })
                    }
                }
            }
        }
    });

//-------------------------------------指令@布局控件------------------------------------
app
    .directive("gtform", function() {
        return {
            restrict: "A",
            replace: true,
            scope: false,
            link: function($scope, e, a, model) {
                e.addClass("GT-Form form-horizontal");
            }
        }
    })
    .directive("demo", function() {
        return {
            restrict: "A",
            replace: true,
            scope: {
                ngModel:"="
            },
            template:function(e,a){
                
            },
            link: function($scope, e, a, model) {
                e.addClass("GT-Form form-horizontal");
            }
        }
    })
    .directive("buttonbar", function() {
        return {
            restrict: "E",
            scope: false,
            template: function(e, a) {
                if (a.type === "grid") { //rowbuttonbar
                    var html = $('<div class="ButtonBar"/>');
                    $("btn", e.context).each(function() {
                        html.append('<button class="btn btn-sm btn-' + ($(this).attr("type") || "primary") + ' btn-xs" ng-if="' + (a.event || 'event') + '.' + $(this).attr("key") + '" ng-click="row.index=$index;' + (a.event || 'event') + '.' + $(this).attr("key") + '(row)">' + $(this).attr("display") + '</button>');
                    })
                    return html[0].outerHTML;
                } else { //buttonbar
                    var html = $('<div class="ButtonBar" style="box-sizing:border-box; text-align:right;"/>');
                    $("btn", e.context).each(function() {
                        var button = $('<button class="btn m-b-xs btn-sm"></button>').appendTo(html);
                        button.attr({
                            "ng-click": (a.event || 'event') + '.' + $(this).attr("key") + '()',
                            "ng-if": (a.event || 'event') + '.' + $(this).attr("key")
                        }).text('{{eventName.' + $(this).attr("key") + '||"' + $(this).attr("display") + '"}}')
                        if ($(this).attr("Type") === "Submit" || $(this).attr("key") === "Next") {
                            button.addClass("btn-primary").attr({
                                // "type": "submit",
                                "ng-disabled": (a.valid || 'form') + ".$invalid"
                            });
                        } else if ($(this).attr("Type") === "Prev") {

                        } else {
                            button.addClass("btn-info");
                        }
                    })

                    /**
                     * [BuildButton description]
                     * @param {[type]} Name [按钮组名称]
                     * @param {[type]} Type [按钮组颜色类型]
                     * @param {[type]} arr  [按钮组数组]
                     */
                    // var BuildButton = function(Name, Type, arr) {
                    //  var ngif = arr.map(function(x) {
                    //      return (a.event || 'event') + '.' + x.Code;
                    //  }).join('||')
                    //  var Btn = $('<div class="btn-group dropdown" dropdown ng-if="' + ngif + '"/>').appendTo(html);
                    //  Btn.append('<button class="btn btn-' + Type + '" dropdown-toggle style="border:0; background-color:transparent;">' + Name + ' <span class="caret"></span></button>')
                    //  var BtnList = $('<ul class="dropdown-menu"/>').appendTo(Btn);
                    //  arr.forEach(function(obj) {
                    //      BtnList.append('<li ng-click="' + (a.event || 'event') + '.' + obj.Code + '();" ng-if="' + (a.event || 'event') + '.' + obj.Code + '"><a>' + (obj.Ico ? "<i class='Btn " + obj.Ico + "'></i>" : "") + '{{eventName.' + obj.Code + '||"' + obj.Name + '"}}</a></li>')
                    //  })
                    // }
                    // BuildButton("操作", "default", ButtonList.OperateList);
                    // BuildButton("标签", "default", ButtonList.TagList);
                    // BuildButton("权限分配", "default", ButtonList.PowerList);
                    // BuildButton("更多操作", "default", ButtonList.OtherButtons);
                    return html[0].outerHTML;
                }
            },
            replace: true,
            controller: function($scope) {},
            link: function(scope, e, a, model) {
                if (a.padding) {
                    e.css("padding", "10px 15px;")
                } else {
                    e.css("padding", "0 15px");
                }
                if (a.float) {
                    e.css("text-align", a.float);
                }
            }
        }
    })
    .directive("breadcrumb", function() {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            template: function(e, a) {
                var html = $("<ol class='breadcrumb'></ol>");
                angular.forEach(e.context.children,function(o,i){
                    html.append("<li class='active'>"+$(o).html()+"</li>");
                });
                return html[0].outerHTML;
            }
        }
    })
    .directive("panel", function() {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            template: function(e, a) {
                var html = $('<div class="panel panel-'+(a.type?a.type:"default")+'"></div>'),
                    head;
                if ($("phead", e).length > 0) {
                    var head = $('<div class="panel-heading font-bold"><span>' + $("phead:eq(0)", e).html() + '</span></div>').appendTo(html);
                    if (a.dialog === "") {
                        $('<div style="float:right;cursor:pointer;" ng-click="event.Close()"><i class="glyphicon glyphicon-remove" style="color:#929292;"></i></div>').appendTo(head);
                    }
                    if (a.expand === "") {
                        head.css("cursor", "pointer");
                    }
                }
                if ($("pbody", e).length > 0) {
                    var body = $('<div class="panel-body" style="padding:0;"></div>').appendTo(html);
                    // if (a.expand === "") {
                    //     $(body).attr("ng-hide", "HideBody");
                    // }
                    body.html($("pbody", e).html());
                    if ($("pbody", e).attr("style")) {
                        body.attr("style", $("pbody", e).attr("style"));
                    }

                }
                if ($("pfoot", e).length > 0) {
                    html.append('<div class="panel-footer">' + $("pfoot", e).html() + '</div>');
                }
                return html[0].outerHTML;
            },
            link: function($scope, element, attr, ngModel) {
                if (attr.expand === "") {
                    $(".panel-heading",element).click(function(){
                        $(".panel-body",element).toggle();
                    })
                }
                $scope.HideBody = false;
                $scope.PanelEvent = {
                    ToggleBody: function() {
                        $scope.HideBody = !$scope.HideBody;
                    }
                }
            }
        }
    })
    .directive("formrow", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                a.colspan = a.colspan ? a.colspan : 2;
                var html = $('<div class="form-group"></div>');
                var label = $('<label class="control-label"></label>').appendTo(html);
                label.addClass('col-sm-' + a.colspan);
                if (a.required || a.required == '') {
                    label.addClass("GT-Must").addClass('col-sm-' + a.colspan);
                }
                var content = $('<div></div>').appendTo(html);
                content.html($(e.context).html());
                content.addClass('col-sm-' + (a.colspan === '12' ? a.colspan : (12 - parseInt(a.colspan))));
                if (a.label) {
                    label.text(a.label);
                } else {
                    content.addClass('col-sm-offset-' + a.colspan);
                }
                return html[0].outerHTML;
            },
            replace: true,
            controller: function($scope, service) {},
            link: function($scope, element, attr, ngModel) {}
        }
    })
    .directive("formRow", function() {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            template: function(e, a) {
                var html = $('<div class="form-group"></div>');
                if (a.padding) {
                    html.css("padding", a.padding)
                }
                var label = $('<label class="control-label"></label>').appendTo(html);
                if (a.margin) {
                    label.css("margin", a.margin)
                }
                if (a.required || a.required == '') {
                    label.addClass("GT-Must").addClass('col-sm-' + a.colspan);
                }
                var content = $('<div ng-transclude></div>').appendTo(html);
                if (a.label) {
                    label.text(a.label);
                } else {
                    content.addClass('col-sm-offset-' + a.colspan);
                }
                return html[0].outerHTML;
            },
            replace: true,
            controller: function($scope, service) {},
            link: function($scope, element, attr, ngModel) {}
        }
    })
    .directive("layout", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $('<div class="hbox hbox-auto-xs bg-light"></div>');
                angular.forEach(e[0].children, function(obj, i) {
                    var $item = $('<div class="col lter"><div class="vbox"></div></div>').appendTo(html);
                    var $width = $(obj).attr("width");
                    if ($(obj).attr("label")) {
                        var title = $('<div class="wrapper b-b"><div class="font-thin h4">' + $(obj).attr("label") + '</div></div>').appendTo($(".vbox", $item));
                        if ($(obj).attr("event")) {
                            title.append('<ButtonBar event="' + $(obj).attr("event") + '" style="float:right; position:relative; right:-27px; bottom:27px;"></ButtonBar>')
                        }
                    }
                    var content = $('<div class="row-row"><div class="cell scroll"><div class="cell-inner" ' + (obj.attributes.bgcolor ? 'style="background-color:' + obj.attributes.bgcolor.value + '"' : "") + '></div></div></div>').appendTo($(".vbox", $item));
                    $(".cell-inner", content).html($(obj).html())
                    // .css("padding","0 5px");
                    if ($width) {
                        if ($width === 'sm') {
                            $item.addClass('w');
                        } else {
                            $item.width($width);
                        }
                    } else {
                        // $(".cell-inner", content).css("padding", "0 15px")
                    }
                })
                return html[0].outerHTML;
            }
        }
    })
    .directive("layoutv", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $('<table class="layout-v" border="0" cellspacing="0" cellpadding="0"></table>');
                angular.forEach(e.context.children,function(o,i){
                    var tr = $("<tr><td><div></div></td></tr>").appendTo(html);
                    if(o.tagName==="CENTER"){
                        tr.addClass('fill')
                    }
                    $("div",tr).html($(o).html());
                })
                return html[0].outerHTML;
            }
        }
    })
    .directive("pagerbar", function() {
        return {
            restrict: "E",
            scope: false,
            replace: true,
            priority: 1,
            template: function(e, a) {
                var html = $("<div></div>");
                var pager = $('<Pagination  rotate="false"></Pagination>').appendTo(html);
                if (a.ngmodel) { //数据源
                    pager.attr("ng-model", a.source + '.' + a.ngmodel);
                }
                if (a.ngchange) { //页码变更事件
                    pager.attr("ng-change", a.ngchange);
                }
                if (a.disabled) { //是否可编辑
                    pager.attr("ng-disabled", a.disabled)
                }
                if (a.totalitems) { //绑定数据总条数
                    pager.attr("total-items", a.source + '.' + a.totalitems);
                }
                if (a.pagesize) { //每页数据条数
                    var val = a.source + '.' + a.pagesize;
                    pager.attr("items-per-page", val + "?" + val + ":10");
                }
                if (!(a.showlr || a.showlr == "")) {
                    pager.attr("direction-links", "false")
                }
                if (a.showlast || a.showlast == "") {
                    pager.attr("boundary-links", "true");
                }
                pager.attr({
                    "max-size": 10,
                    "previous-text": a.ltext ? a.ltext : "上一页",
                    "next-text": a.rtext ? a.rtext : "下一页",
                    "first-text": a.firsttext ? a.firsttext : "首页",
                    "last-text": a.lasttext ? a.lasttext : "尾页"
                });
                return html[0].outerHTML;
            }
        }
    })
    .directive("gtgrid", function() {
        return {
            restrict: "E",
            template: function(e, a) {
                var html = $('<div class="GT-Table"></div>');
                var table = $('<table></table>').appendTo(html);
                var thead = $('<thead></thead>').appendTo(table);
                var tbody = $('<tbody></tbody>').appendTo(table);
                var headtr = $("<tr></tr>").appendTo(thead);
                var bodytr = $('<tr ng-repeat="row in ' + a.listcode + ' track by $index" bg-class="$index%2?\'ever\':\'\'" ></tr>').appendTo(tbody);
                var DefaultColumnLength = 0;
                var reslut = "return javascript:void(0);";
                if (a.select || a.select == "") {
                    DefaultColumnLength++;
                    var td = $('<td></td>').appendTo(bodytr);
                    var th = $('<th style="width:50px;"></th>').appendTo(headtr);
                    if (a.selecttype == "only") {
                        var checkbox = $('<Radio ngmodel="row.Checked" Group="GridRadio"></Radio>').appendTo(td);
                        if (a.ngchecked) {
                            checkbox.attr("ngchange", a.ngchecked)
                        }
                    } else {
                        var checkbox = $('<Checkbox ngmodel="row.Checked"></Checkbox>').appendTo(td);
                        $('<Checkbox ngmodel="sel_all"></Checkbox>').appendTo(th);
                        if (a.ngchecked) {
                            checkbox.attr("ngchange", "row.index=$index;" + a.ngchecked + "(row)")
                        }
                    }
                }
                if (a.index || a.index == "") {
                    DefaultColumnLength++;
                    $('<td ng-bind="$index+1"></td>').appendTo(bodytr);
                    $('<th style="width:50px;">序号</th>').appendTo(headtr);
                }
                /*-----ngrepeat_column-----*/
                // $('<th ng-repeat="column in GridColumnList.' + a.columncode + '" ng-bind="column.HeaderText"></th>').appendTo(headtr);
                // $('<td ng-repeat="column in GridColumnList.' + a.columncode + '" ng-click="row.Checked=!row.Checked;' + (a.ngchecked ? a.ngchecked + "(row)" : "") + '" ><div  style="width:100%; overflow:hidden" ng-bind="row.{{column.FieldName}}"></div></td>').appendTo(bodytr);

                angular.forEach(e.context.children, function(obj, index) {
                    if (obj.tagName === "COLUMN") {
                        $('<th>' + obj.attributes["display"].value + '</th>').appendTo(headtr);
                        if (obj.attributes["type"] && obj.attributes["type"].value === "img") {
                            $('<td ng-click="' + obj.attributes["ngClick"].value + '"><img  style=" max-height:44px; overflow:hidden" ng-src="{{row.' + obj.attributes["key"].value + '}}"/></td>').appendTo(bodytr);
                        } else if (obj.attributes["type"] && obj.attributes["type"].value === "input") {
                            var o = $('<td><input type="text" style="margin:0 auto;" class="form-control" value="{{row.' + obj.attributes["key"].value + '}}"/></td>').appendTo(bodytr);
                            if (obj.attributes["width"] && obj.attributes["width"].value) {
                                $("input", o).css("width", obj.attributes["width"].value)
                            }
                        } else if (obj.attributes["type"] && obj.attributes["type"].value === "select") {
                            var o = $('<td><select style="margin:0 auto;" class="form-control" ng-model="row.' + obj.attributes["val"].value + '" ng-options="x.' + obj.attributes["label"].value + ' for x in ' + obj.attributes["list"].value + '"></select></td>').appendTo(bodytr);
                            if (obj.attributes["width"] && obj.attributes["width"].value) {
                                $("select", o).css("width", obj.attributes["width"].value)
                            }
                        } else {
                            $('<td ng-click="row.Checked=!row.Checked;' + (a.ngchecked ? a.ngchecked + "(row)" : "") + '" ><div  style="width:100%; overflow:hidden" ng-bind="row.' + obj.attributes["key"].value + '"></div></td>').appendTo(bodytr);
                        }
                    }
                })
                $("operate", e.context).each(function() {
                        $('<th style="width:200px;">操作</th>').appendTo(headtr);
                        var operate = $('<td><ButtonBar type="grid" event="' + (a.event || 'event') + '"></ButtonBar></td>').appendTo(bodytr);
                        $("btn", this).each(function() {
                            $(this).appendTo($("ButtonBar", operate));
                        })
                    })
                    // if (a.edit || a.edit == "") {
                    // 	DefaultColumnLength++;
                    // 	$('<td><ButtonBar type="grid" event="' + (a.event || 'event') + '"></ButtonBar></td>').appendTo(bodytr);
                    // 	$('<th style="width:200px;">操作</th>').appendTo(headtr);
                    // }
                    // $('<tfoot><tr ng-if="' + a.listcode + '.length==0||!' + a.listcode + '"><td colspan="{{GridColumnList.' + a.columncode + '.length+' + DefaultColumnLength + '}}">暂无数据</td></tr></tfoot>').appendTo(tbody);
                $('<tfoot><tr ng-if="' + a.listcode + '.length==0||!' + a.listcode + '"><td colspan="' + e.context.children.length + DefaultColumnLength + '">暂无数据</td></tr></tfoot>').appendTo(table);
                if (a.pagedata || a.pagedata == "") {
                    var pager = $("<PagerBar ShowLR ShowLast></PagerBar>").appendTo(html);
                    pager.attr("source", a.pagedata)
                    pager.attr("ngmodel", "Index")
                    pager.attr("totalitems", "Count")
                    pager.attr("PageSize", "Size");
                    pager.attr("ngchange", a.pagechange);
                }
                return html[0].outerHTML;
            },
            replace: true,
            controller: "GridCtrl",
            link: function($scope, element, attr, ngModel) {
                $scope.ListCode = attr.listcode;
                $scope.$watch("sel_all", function(newval, oldval, scope) {
                    if (newval != oldval) {
                        angular.forEach(scope.$eval(scope.ListCode), function(obj, index) {
                            obj.Checked = newval;
                            if (attr.ngchecked) {
                                eval('$scope.' + attr.ngchecked + "(obj)");
                            }
                        })
                    }
                })
            }
        }
    })
    .directive("warningbarmodel", function() {
        return {
            restrict: "AE",
            scope: true,
            priority: 1,
            templateUrl: '/Ctl_Resources/WarningBar/WarningBar.html',
            replace: true
        }
    })
    .directive("gtlist", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $("<div></div>");
                var item = $("<div class='GT-Item-List'></div>").appendTo(html);
                item.append(e[0].innerHTML);
                // item.append('<div class="ItemButton"><i class="fa fa-edit">编辑</i><i class="fa fa-times">删除</i></div>')
                item.children(1).attr("ng-repeat", a.itemcode + " in " + a.listcode + " track by $index");
                if (a.pageshow) {
                    html.append("<PagerBar></PagerBar>");
                };
                return html[0].outerHTML;
            }
        }
    })
    .directive("tree", function() {
        return {
            restrict: "E",
            replace: true,
            scope:false,
            template: function(e, a) {
                var html = $('<ul id="'+a.id+'" class="ztree" style=""></ul>');
                return html[0].outerHTML;
            },
            link: function(scope, e, a, treeControl) {
                var zTreeObj,
                    setting = {
                        view: {
                            selectedMulti: false
                        }
                    }
               		zTreeObj = $.fn.zTree.init(e, setting, scope.$eval(a.data)||[]);
                    if(!scope.$parent.trees){
                    	scope.$parent.trees = {
                    	}
                    };
                    scope.$parent.trees[a.id] = zTreeObj;
            }
        }
    })
    .directive("tabpanel", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $("<div></div>");
                var tabpanel = $('<TabSet class="tab-container"></TabSet>').appendTo(html);
                angular.forEach($("Tab", e), function(obj, index) {
                    var tab = $("<Tab></Tab>").appendTo(tabpanel);
                    tab.attr("heading", $(obj).attr("label"));
                    if ($(obj).attr('style')) tab.attr('style', $(obj).attr('style'));
                    tab.html($(obj).html());
                })
                return html[0].outerHTML;
            }
        }
    })
    .directive("dialog", function() {
        return {
            restrict: "A",
            replace: true,
            link: function(scope, e, a) {
                e.css("margin-bottom", 0);
                e.css("padding-bottom", 0);
            }
        }
    })
    .directive("rowtextbox", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $("<div/>");
                var row = $((a.morerow ? "<Form-Row/>" : "<FormRow/>")).appendTo(html);
                if (a.padding) row.attr("padding", a.padding);
                if (a.margin) row.attr("margin", a.margin);
                if (a.colspan) row.attr("colspan", a.colspan);
                if (a.label) row.attr("Label", a.label);
                var text = $("<TextBox></TextBox>").appendTo(row);
                if (a.required || a.required == '') {
                    text[0].attributes.setNamedItem(document.createAttribute('Required'));
                    row[0].attributes.setNamedItem(document.createAttribute('Required'));
                }
                if (a.type) text.attr("type", a.type);
                if (a.placeholder) text.attr("placeholder", a.placeholder);
                if (a.ngmodel) text.attr("ngmodel", a.ngmodel);
                if (a.ngdisabled || a.disabled == "") text.attr("ng-disabled", a.ngdisabled);

                return html[0].outerHTML;
            },
            controller: function($scope) {}
        }
    })
    .directive("report", function() {
        return {
            restrict: "E",
            replace: true,
            template: function(e, a) {
                var html = $('<div style="height:100%;"/>');
                var layout = $('<Layout/>').appendTo(html);
                var left_layout = $('<Item Label="选择表格数据" width="sm"></Item>').appendTo(layout);
                var right_layout = $('<Item Label="报表筛选" BgColor="White"></Item>').appendTo(layout);
                // 左侧
                var tableList = $('<div ng-repeat="table in tables" style="padding:20px 0 0 20px;"/>').appendTo(left_layout);
                var tableTitle = $('<div style="color:silver; padding-bottom:6px; font-size:12px;" ng-bind="table.ChineseName"/>').appendTo(tableList);
                var table_column = $('<div><CheckBox ngmodel="param.Checked" ng-show="param.AttributeType==0" ng-repeat="param in table.Items" value="{{param.ChineseName}}"></CheckBox></div>').appendTo(tableList);
                //右侧
                var tableFilter = $('<div class="FormRow"/>').appendTo(right_layout);
                var tableList2 = $('<div ng-repeat="table in tables"/>').appendTo(tableFilter);
                var table2Column = $('<div ng-repeat="param in table.Items" ng-if="param.AttributeType==1">').appendTo(tableList2);
                $('<div class="_cell">{{param.ChineseName}}</div>').appendTo(table2Column);
                $('<div class="_cell"><RadioList ListCode="param.Items" ItemCode="page" bind="page.Description" ngmodel="param.SelectedItem" AllText="全部"></RadioList></div>').appendTo(table2Column);
                $('<hr>').appendTo(right_layout);
                $('<ButtonBar></ButtonBar>').appendTo(right_layout);
                $('<GTGrid ItemCode="row" ColumnCode="TempColumns" PageChange="event.Search()" ListCode="data" PageData="Page" index select ' + (a.edit ? "edit" : "") + '></GTGrid>').appendTo(right_layout);
                return html[0].outerHTML;
            },
            controller: function($scope, DataBaseService) {
                $scope.DataBaseService = DataBaseService;
            },
            link: function($scope, e, a) {
                $scope.Id = a.id;
                $scope.GridColumnList.TempColumns = [];
                $scope.Page = {
                    Index: 1
                };
                $scope.event = $.extend(true, $scope.event, {
                    LoadData: function() {
                        $scope.DataBaseService.GetTableList($scope, {
                            isSetting: true,
                            DataBaseID: a.id,
                            PageIndex: 1
                        }, function(data) {
                            $scope.tables = data.List.map(function(x) {
                                x.Items.map(function(o) {
                                    if (o.AttributeType === 0) {
                                        o.Checked = true;
                                    }
                                    return o;
                                });
                                return x;
                            });
                            $scope.event.Search();
                        });
                    },
                    Search: function() {
                        $scope.model = {
                            DatabaseId: a.id,
                            TableList: []
                        }
                        $scope.GridColumnList.TempColumns = [];
                        $scope.model.TableList = $scope.tables.filter(function(obj) {
                            var _obj = $.extend(true, {}, obj);
                            _obj.Items = obj.Items.filter(function(o) {
                                if (o.AttributeType == 0 && o.Checked) {
                                    $scope.GridColumnList.TempColumns.push({
                                        FieldName: o.DisplayName,
                                        HeaderText: o.ChineseName
                                    });
                                    return o;
                                } else if (o.AttributeType == 1 && o.SelectedItem) {
                                    return o;
                                }
                            })
                            return _obj;
                        })
                        $scope.model.TableList = $scope.model.TableList.filter(function(x) {
                            if (x.Items.length != 0) return x;
                        })
                        $scope.DataBaseService.CreateReport($scope, $.extend($scope.model, {
                            PageIndex: $scope.Page.Index
                        }), function(data) {
                            $scope.data = data.List;
                            $scope.Page.Count = data.Num;
                        })
                    }
                });
                $scope.event.LoadData();
            }
        }
    })
    .directive("operationTable", function() {
        return {
            restrict: "E",
            replace: true,
            link: function(scope, e, a) {

            }
        };
    });
//------------------------------------过滤器-----------------------------------
app
    .filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .filter('SelectAll', function($sce) {
        return function(data) {
            var Sel_Count = 0;
            angular.forEach(data, function(obj, i) {
                if (obj.Checked) Sel_Count++;
            })
            if (!data) return false;
            return Sel_Count == data.length;
        }
    })
    .filter('ReturnListColumn', function($sce) {
        return function(List, ColumnName) {
            if (List) {
                return List.map(function(x) {
                    return x[ColumnName];
                }).join('、');
            } else {
                return "";
            }
        }
    })

//-------------------------------------服务-------------------------------------
app.service('MenuTypeList', function() {
    return [{
        PlatformName: "Web",
        PlatformId: 0,
        TreeObj: "Web_zTree"
    }, {
        PlatformName: "PC",
        PlatformId: 1,
        TreeObj: "PC_zTree"
    }, {
        PlatformName: "Andriod",
        PlatformId: 2,
        TreeObj: "Andriod_zTree"
    }, {
        PlatformName: "IOS",
        PlatformId: 3,
        TreeObj: "IOS_zTree"
    }];
})
app
    .factory('DataOperate', function($http, service, $modal) {
        var ret = {
            Add: function(route, param, fun) {
                service.http.ajax({
                        type: route.Type,
                        url: route.Url,
                        data: param
                    })
                    .success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            service.msg.popover(data ? "添加成功！" : "添加失败！");
                            if (fun) fun(data);
                        })
                    });
            },
            Edit: function(route, param, fun) {
                service.http.ajax({
                        type: route.Type,
                        url: route.Url,
                        data: param
                    })
                    .success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            service.msg.popover(data ? "修改成功！" : "修改失败！");
                            if (fun) fun(data);
                        })
                    });
            },
            Save: function(route, param, fun) {
                service.http.ajax({
                        type: route.Type,
                        url: route.Url,
                        data: param
                    })
                    .success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            service.msg.popover(data ? "保存成功！" : "保存失败！");
                            if (fun) fun(data);
                        })
                    });
            },
            Delete: function(route, param, fun) {
                service.msg.confirm("确定需要删除吗", function() {
                    service.http.ajax({
                            type: route.Type,
                            url: route.Url,
                            data: param
                        })
                        .success(function(data) {
                            service.http.DataHandle(data, function(data) {
                                service.msg.popover(data ? "删除成功！" : "删除失败！");
                                if (fun) fun(data);
                            })
                        });
                }, $.noop)
            },
            ResetPassword: function(route, param, fun) {
                service.msg.confirm("确定需要重置密码吗", function() {
                    service.http.ajax({
                            type: route.Type,
                            url: route.Url,
                            data: param
                        })
                        .success(function(data) {
                            service.http.DataHandle(data, function(data) {
                                service.msg.popover(data ? "重置成功！" : "重置失败！");
                                if (fun) fun(data);
                            })
                        });
                }, $.noop)
            },
            LoadData: function(route, param, fun) {
                service.http.ajax({
                        type: route.Type,
                        url: route.Url,
                        data: param
                    })
                    .success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            if (fun) fun(data);
                        })
                    });
            },
            AsyncData: function(route, param, fun) {
                service.http.asyncajax({
                    type: route.Type,
                    url: route.Url,
                    data: param,
                    success: function(data) {
                        if (fun) fun(data);
                    }
                })
            },
            ListDeff: function(List) {
                return List.filter(function(obj) {
                    if (obj.Checked) {
                        obj.Items = obj.Items.filter(function(o) {
                            if (o.Checked) {
                                o.DataState = 0;
                                return o;
                            } else {
                                if (o.OldCheck) {
                                    o.DataState = 1;
                                    return o;
                                }
                            }
                        })
                        return obj;
                    } else {
                        if (obj.OldCheck) {
                            obj.DataState = 1;
                            return obj;
                        }
                    }
                });
            },
            BuildListChecked: function(List, SelectList, filters, DotDelete) {
                if (!SelectList) {
                    return List;
                }
                return List = List.map(function(x) {
                    for (var i = 0; i < SelectList.length; i++) {
                        if (SelectList[i][filters] === x[filters]) {
                            $.extend(x, {
                                checked: true,
                                Checked: true,
                                IsEnabled: SelectList[i].IsEnabled
                            });
                            if (!DotDelete) SelectList.splice(i, 1);
                            break;
                        }
                    }
                    return x;
                })
            },
            ClearTreeNode: function(tree) {
                //清空树所有的节点
                var list = tree.transformToArray(tree.getNodes());
                for (var i = 0; i < list.length; i++) {
                    tree.removeNode(list[i]);
                }
            }
        };
        return ret;
    })
    .factory('TreeOperate', function($http, service, $modal) {
        var ret = {
            removeNode: function(TreeData, node) {
                ret.eachNode(TreeData, node, "remove");
            },
            addNodes: function(TreeData, parentNode, newNodes) {
                for (var i = 0; i < newNodes.length; i++) {
                    if (parentNode) {
                        parentNode.Childrens.push(newNodes[i]);
                    } else {
                        TreeData.push(newNodes[i]);
                    }
                }
            },
            getNodes: function(TreeData) {
                return ret.eachNode(TreeData, null, "get");
            },
            eachNode: function(List, Node, type) {
                var all = [];
                for (var i = 0; i < List.length; i++) {
                    if (type == "get") {
                        all.push(List[i]);
                        if (List[i].Childrens) {
                            var children = ret.eachNode(List[i].Childrens, Node, type);
                            for (var j = 0; j < children.length; j++) {
                                all.push(children[j]);
                            };
                        }
                    } else {
                        if (Node === List[i]) {
                            if (type == "remove") {
                                List.splice(i, 1);
                            }
                            return true;
                        }
                        if (List[i].Childrens && ret.eachNode(List[i].Childrens, Node, type)) {
                            return false;
                        }
                    }
                }
                return all;
            }
        };
        return ret;
    })
    .factory('Dialog', function($http, service, $modal) {
        var ret = {
            Show: function(url, controller, size, param, fun) {
                var modal = $modal.open({
                    templateUrl: url,
                    controller: controller,
                    backdrop: "static",
                    size: size,
                    resolve: param
                })
                modal.result.then(function(result) {
                    if (fun) fun(result);
                })
            }
        };
        return ret;
    })
    .factory('ListOperate', function($http, service, $modal) {
        var ret = {
            Show: function(url, controller, size, param, fun) {
                var modal = $modal.open({
                    templateUrl: url,
                    controller: controller,
                    backdrop: "static",
                    size: size,
                    resolve: param
                })
                modal.result.then(function(result) {
                    if (fun) fun(result);
                })
            }
        };
        return ret;
    })

//------------------------------------控制器---------------------------------------

app
    .controller('GridCtrl', function($scope, service) {})
    .controller('PublicDataCtrl', function($scope, service) {
        //获取页面数据
        service.http.ajax({
                type: "get",
                url: "Menu/GetMenus"
            })
            .success(function(data) {
                service.http.DataHandle(data, function(data) {
                    $scope.PublicData.MenuList = data;
                })
            });
    })
    .controller('ListPageCtrl', function($scope, service) {
        $scope.type = Request("type");
        $scope.GroupType = false;
        $scope.SetData = {
            ListDataCode: "",
            TypeDataCode: "",
            RequestParams: {},
            TypeId: "",
            ViewType: ""
        }
        switch ($scope.type) {
            case "Notice":
                $scope.SetData.ListDataCode = "GTLS_2";
                $scope.NavName = "通知";
                break;
            case "Info":
                $scope.SetData.ListDataCode = "GTLS_8";
                $scope.NavName = "资讯";
                break;
            case "Knowledge":
                $scope.SetData.TypeDataCode = "GTLS_3";
                $scope.NavName = "知识库";
                $scope.SetData.RequestParams = {
                    pluginId: "e0979e55-1bca-4d22-b4e3-8772d82c73bd"
                };
                $scope.SetData.ListDataCode = "GTLS_9";
                $scope.ChangeTab = function(argItemId) {
                    $scope.SetData.TypeId = argItemId;
                    $scope.event.LoadListData();
                }
                break;
            case "ChildSys":
                $scope.SetData.ViewType = "Image";
                $scope.SetData.ListDataCode = "GTLS_6";
                $scope.NavName = "企业介绍";
                break;
        }
        $scope.event = {
            LoadListData: function() {
                service.http.json("get", $scope.SetData.ListDataCode, {
                    PageIndex: $scope.pageData.Index,
                    PageSize: $scope.pageData.Size,
                    itemId: $scope.SetData.TypeId
                }).success(function(data) {
                    service.http.DataHandle(data, function(data) {
                        $scope.ListData = data.List;
                    });
                });
            },
            LoadTypeData: function() {
                service.http.json("get", $scope.SetData.TypeDataCode, $scope.SetData.RequestParams).success(function(data) {
                    $scope.GroupType = data.data;
                    $scope.SetData.TypeId = data.data[0].Id

                    service.http.json("get", $scope.SetData.ListDataCode, {
                        PageIndex: $scope.pageData.Index,
                        PageSize: $scope.pageData.Size,
                        itemId: $scope.SetData.TypeId
                    }).success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            $scope.ListData = data.List;
                        });
                    });
                })
            }
        }
        if ($scope.SetData.TypeDataCode == "") {
            if ($scope.type == "ChildSys") {
                service.http.json("get", $scope.SetData.ListDataCode, {
                    PageIndex: $scope.pageData.Index,
                    PageSize: $scope.pageData.Size,
                    itemId: $scope.SetData.TypeId
                }).success(function(data) {
                    $scope.ListData = data.data;
                });
            } else {
                $scope.event.LoadListData();
            }
        } else {
            $scope.event.LoadTypeData();
        }
    })
    .controller('NotceContentCtrl', function($scope, service) {
        var urlId = Request("id");
        $scope.type = Request("type");
        $scope.SetData = {
            ListDataCode: "",
            RequestParams: {},
            TypeId: "",
            ViewType: ""
        }
        switch ($scope.type) {
            case "Notice":
                $scope.SetData.ListDataCode = "GTLS_12";
                $scope.SetData.RequestParams = {
                    NoticeId: urlId
                };
                break;
            case "Info":
                $scope.SetData.ListDataCode = "GTLS_11";
                $scope.SetData.RequestParams = {
                    newsId: urlId
                };
                break;
            case "Knowledge":
                $scope.SetData.ListDataCode = "GTLS_13";
                $scope.SetData.RequestParams = {
                    knowledgeId: urlId
                };
                break;
            case "ChildSys":
                $scope.SetData.ViewType = "Image";
                $scope.SetData.ListDataCode = "GTLS_10";
                $scope.SetData.RequestParams = {
                    id: urlId
                };
                break;
        }
        service.http.json("get", $scope.SetData.ListDataCode, $scope.SetData.RequestParams).success(function(data) {
            if ($scope.type == "ChildSys") {
                $scope.data = data;
            } else {
                $scope.data = data.RtnData;
            }
        });
    });

Array.prototype.remove = function(b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};
var SelectSet = function(val, List, key) {
    var temp_menus = $.extend(true, {}, val);
    val = [];
    var temp_val = [];
    angular.forEach(temp_menus, function(obj, i) {
        for (var j = 0; j < List.length; j++) {
            if (obj[key || 'Id'] === List[j][key || 'Id']) {
                temp_val.push(List[j]);
            }
        }
    })
    return temp_val;
}

var Request = function(strName) {
    var strHref = location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}
var ButtonList = {
    OperateList: [{
        "Code": "Add",
        "Ico": "btn-add",
        "Name": "添加"
    }, {
        "Code": "AddRoot",
        "Ico": "btn-add",
        "Name": "添加根节点"
    }, {
        "Code": "AddChild",
        "Ico": "btn-add",
        "Name": "添加子节点"
    }, {
        "Code": "EditInfo",
        "Ico": "btn-edit",
        "Name": "修改"
    }, {
        "Code": "DeleteSelect",
        "Ico": "btn-delete",
        "Name": "删除"
    }],
    TagList: [{
        "Code": "PluginTagBtn",
        "Name": "插件标签"
    }, {
        "Code": "PersonTagBtn",
        "Name": "人组标签"
    }, {
        "Code": "BatchBtn",
        "Name": "批量打标签"
    }, {
        "Code": "CommonTag",
        "Name": "普通标签"
    }],
    PowerList: [{
        "Code": "SetPowerBtn",
        "Name": "功能权限"
    }, {
        "Code": "DeptmentBtn",
        "Name": "节点权限"
    }, {
        "Code": "RoleBtn",
        "Name": "角色分配"
    }],
    OtherButtons: [{
        "Code": "Select",
        "Name": "选择"
    }, {
        "Code": "SetVip",
        "Name": "设置Vip码"
    }, {
        "Code": "Custom",
        "Name": "自建"
    }, {
        "Code": "ResetPassword",
        "Name": "重置密码"
    }, {
        "Code": "Bind",
        "Name": "绑定"
    }, {
        "Code": "unBind",
        "Name": "解绑"
    }, {
        "Code": "Input",
        "Name": "导入"
    }, {
        "Code": "Print",
        "Name": "打印"
    }, {
        "Code": "DownLoad",
        "Name": "下载"
    }, {
        "Code": "Push",
        "Name": "推送"
    }],
    BaseButtons: [{
        "Code": "Prev",
        "Name": "上一步"
    }, {
        "Code": "Next",
        "Name": "下一步"
    }, {
        "Code": "Save",
        "Type": "Submit",
        "Name": "保存"
    }, {
        "Code": "OK",
        "Name": "确定"
    }, {
        "Code": "Search",
        "Name": "查询"
    }, {
        "Code": "Close",
        "Name": "关闭"
    }]
}

function LogSocket($scope, host, port) {
    _this = this;
    _this.host = host;
    _this.portAjax = port;
    _this.MessageList = [];
    $.ajax({
        async: false,
        url: "http://" + _this.host + ":" + _this.portAjax + "/log/port",
        success: function(data) {
            _this.port = data;
        }
    })
    $.ajax({
        async: false,
        url: "http://" + _this.host + ":" + _this.portAjax + "/logs",
        success: function(data) {
            _this.LogList = data.map(function(x) {
                return {
                    Name: x
                };
            });
        }
    })
    if (_this.port) {
        _this.socket = new WebSocket('ws://' + _this.host + ':' + _this.port + '/log');
        _this.socket.onopen = function(event) {
            $scope.$emit('AddLog', "连接成功！");
        };
        // 发送一个初始化消息
        // 监听消息
        _this.socket.onmessage = function(event) {
            $scope.$emit('AddLog', event.data);
        };
    }
}
