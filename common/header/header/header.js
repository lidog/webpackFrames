/*
 * @Author lizhenhua
 * @version 2018/4/12
 * @description 
 */

$(function () {
    initEvent();
    initNavigation();
});

function initEvent() {
    var html = require('html-withimg-loader!./header.html');
    $("#header").html(html);
    tools.getImg();
};

/**
 * 功能：高亮当前页面
 * @param {array}
 * @Author lzh
 */
function initNavigation() {
    var navigation= [
        "index.html",
        "login.html",
    ],page='',url =  window.location.href;
     navigation.forEach(function (o) {
        if(url.indexOf(o)!==-1){
            page = o;
            return;
        }
    });
    $("#pageLink li").find("a[href='"+page+"']").parent().addClass("active").siblings().removeClass("active");
};
