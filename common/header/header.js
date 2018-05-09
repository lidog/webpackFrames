/*
 * @Author lizhenhua
 * @version 2018/4/12
 * @description 
 */


$(function () {
    initEvent();
    initNavigation();
})

function initEvent() {
    var html = require('html-withimg-loader!./header.html');
    $("#header").html(html);
    
    //登录
    $(".login").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    $(".login-type .tab-item").click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        $("#loginType").val($(this).index());
    });
    
    $("#login").click(function () {
        var data = getData();
        if(/^\s*$/.test(data.name)){
            tools.errKey($("#name"));
            return
        };
        if(/^\s*$/.test(data.password)){
            tools.errKey($("#password"));
            return
        };
        console.log(data);
    })


    
}

/**
 * 功能：高亮当前页面
 * @param {array}
 * @Author lzh
 */
function initNavigation() {
    var navigation= [
        "index.html",
        "dispBuyEleBao.html",
        "dispSaleEleBao.html",
        "dispUseEleBao.html",
        "buyElePackege.html",
        "buyEleService.html",
        "news.html",
        "register.html",
        "#login",
    ],page='',url =  window.location.href;
     navigation.forEach(function (o) {
        if(url.indexOf(o)!==-1){
            page = o;
            return;
        }
    });
    $("#pageLink li").find("a[href='"+page+"']").parent().addClass("active").siblings().removeClass("active");
}


//获取整体数据
function getData() {
    var data = {};
    $("input[name]").each(function (i,o) {
        var key,val;
        key = $(this).attr('name');
        val=$(this).attr('input-value')?$(this).attr('input-value'): $(this).val();
        data[key]=val;
    })
    return data;
}
