/*
 * @Author lizhenhua
 * @version 2018/4/16
 * @description 
 */


import tools from "./tools.js";
import API from "./apiConfig.js";


//暴露给全局   其他页面可以直接 使用 该对象下的方法
window.tools = tools;   //直接使用的对象一定要在 $(function(){ 这里面使用 })
window.API = API;

$(function () {
    initEvent()
});

function initEvent() {
    //全部运行此函数,加载本地图片资源；如果是服务器图片资源，直接用img标签即可
    tools.getImg();

};
 