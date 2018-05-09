/*
 * @Author lizhenhua
 * @version 2018/4/12
 * @description 
 */

$(function () {
    initEvent()
});

function initEvent() {
    var html = require('html-withimg-loader!./footer.html');
    $("#footer").html(html);
    tools.getImg();

    //设置content 最小高度
    $(".content").css("min-height",document.body.clientHeight - $(".footer").outerHeight());

};


 