/*
 * @Author lizhenhua
 * @version 2018/4/8
 * @description 定义一些工具方法，全局公用
 */

import template from "../plugins/template"
import notie from  "../plugins/notie-master/dist/notie.min.js"

export default {
    myName:function () {
        return "镇华.Li"
    },
    //实现img html使用<span class="data-img" img-src="newLogo.png"></span>
    getImg:function () {
        $("span[img-src]").each(function (i,o) {
            if($(o).find('img').length==0){
                var src = $(o).attr("img-src");
                var img = document.createElement("img");
                img.src = require("../images/"+src);
                $(o).append(img);
            }
        })
    },
    //获取url中的参数
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    /**
     * 功能：template 摸板函数 返回html 片段
     * @param {scriptId} 摸板id
     * @param {data}    渲染数据
     * @Author lzh
     */
    getHtml:function (scriptId,data) {
        var tpl = document.getElementById(scriptId).innerHTML;
        return template(tpl, {list:data});
    },
    /**
     * 功能：template摸板函数 直接插入目标id
     * @param {boxId} 插入目标id
     * @param {scriptId} 摸板id
     * @param {data}    渲染数据
     * @Author lzh
     */
    tpl:function (boxId,scriptId,data) {
        document.getElementById(boxId).innerHTML = this.getHtml(scriptId,data);
    },
    /**
     * 功能：suggest-input 带建议的输入框
     * @param {str} suggest-url 自定义属性 建议数据的url
     * @callback {str} 选中回调
     * @Author lzh
     */
    suggestInput:function(id,yourOption){
        var _this = this;
        var option = {
            className:"suggest-option",//建议框的名字
            urlName:"suggest-url",
            dataName:"suggest-data",
            liValue:"value",
            liText:"title",
            inputValue:"input-value",
            refresh:false, //是否每次刷新
            minWidth:0,
            callback:false
        };
        option = $.extend(option,yourOption);
        var $input;
        var $suggest = $('[suggest-key="'+id+'"]');
        if($suggest.length==0){
            $('body').append( '<div class="suggest-option" suggest-key="'+id+'"><ul></ul></div>');
            $suggest = $('[suggest-key="'+id+'"]');
        }
        $("#"+id).on("focus click",function () {
            $("[suggest-key]").hide();
            var url = $(this).attr(option.urlName);
            var dataKey = $(this).attr(option.dataName);
            $input = $(this);
            var $ul = $suggest.find("ul");
            var top = $input.offset().top + $input.outerHeight()+5;
            var left = $input.offset().left;
            var width = $input.outerWidth()+option.minWidth;
            //如果用本地写死的数据
            if(typeof dataKey=='string'&&$ul.find('li').length==0){
                $ul.html('');
                window[dataKey].forEach(function (p1) {
                    $ul.append("<li value='"+p1[option.liValue]+"'>"+p1[option.liText]+"</li>");
                });
            };
            //是否每次都刷新
            if(url&&option.refresh){
                loaderLi(url)
            };
            //没有数据才申请
            if(url&&$ul.find('li').length==0){
                loaderLi(url)
            };
            function loaderLi(url) {
                _this.doAjaxPost(url,'',function (resp) {
                    if(resp&&resp.status==1){
                        var dataObj = resp.data;
                        $ul.html('');
                        if(dataObj.length>0){
                            dataObj.forEach(function (p1) {
                                $ul.append("<li value='"+p1[option.liValue]+"'>"+p1[option.liText]+"</li>");
                            });
                        }else {
                            $ul.append("<li>暂无数据</li>")
                        }
                    }
                });
            }

            if(!dataKey&&!url){
                $ul.html('').append("<li>暂无数据</li>")
            }
            $suggest.css({
                top:top,
                left:left,
                width:width
            }).show();
            $input.parents().each(function (i,o) {
                if($(o).css('overflow-y')=="auto"){
                    return $(o);
                }
            }).scroll(function () {
                $suggest.css({
                    top:$input.offset().top + $input.outerHeight()+5,
                })
            });
            $input.click(function (e) {
                e.stopPropagation();
            });
            $("body").click(function () {
                $suggest.hide();
            });
        });

        $suggest.on('click','li',function (e) {
            if($(this).text()=="暂无数据"){
                return;
            }
            $input.val($(this).text()).attr(option.inputValue,$(this).attr('value'));
            // $input.focus();
            $suggest.hide();
            if(option.callback&&typeof option.callback=='function'){
                option.callback($(this).attr('value'))
            }
            e.stopPropagation();
        });
        return option;
    },


    doAjaxPost:function (url,param,callBack) {
        $.ajax({
            data:param,
            url:url,
            type:"post",
            success:function () {
                if(callBack){
                    callBack();
                }
            }
        })
    },
    //错误动画提示
    errKey:function($obj) {
        $obj.addClass('err-key');
        setTimeout(function () {
            $obj.removeClass('err-key');
        },1000)
    },
    //消息提示
    tips:function (text,typeStr,time) {
        if(text){
            switch (typeStr){
                case "warn":{
                    notie.alert({ type: 2, text: text, time: time||2 })
                } break;
                case "err":{
                    notie.alert({ type: 3, text: text, time:time||2 })
                }break;
                case "info":{
                    notie.alert({ type: 4, text: text, time:time||2 })
                }break;
                default:{
                    notie.alert({ type: 1, text: text, time:time||2 })
                }
            }
        }
    }


}


 