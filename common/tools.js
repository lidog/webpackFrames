/*
 * @Author lizhenhua
 * @version 2018/4/8
 * @description 定义一些工具方法，全局公用
 */

import template from "../plugins/template"
import notie from  "../plugins/notie-master/dist/notie.min.js"


export default {
    say:function () {
      notie.alert({ type: 4, text: "谢谢你的使用，记得star一下哦", time:2 })
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


 