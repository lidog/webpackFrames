# webpack打包web多页面开发的脚手架

## 背景：

公司要重构java项目的jsp页面，换成html，前后端分离的模式；
为了使最终的项目容易维护，同时产出效率高；我使用了webpack作为构建工具，也算是学习一下webpack吧；
此脚手架需要满足的要求包括：

* 头部header，脚部 footer；要公用

* 有统一地方配置公共样式，方法，API

* 自动编译，实时预览更改，方便前端调试

* 使用es6，scss，ejs开发

* 可异步加载 html

* 容易配置传统jq插件，不影响打包速度


## 用法

    cd webpackFrames

    npm install

    npm run view

以上代码会打包出一个dist 文件夹；你可以直接点击里面的某个html 预览效果；

    npm run server
    
会打开浏览器，运行代码，本地调试。 
因为接口可能需要跨域，所以打开tools.js
   
   
    //是否是生产环境
    let product = false;

product 改为false 以后 会自动代理请求到你配置的域。
当你要打包dist 的时候，就要吧它改为false。

代理目标域名在webpack.config.js 中配置

    



## 怎么增加你的东西

### 增加一个 login 页面

* 在page下 新建 login 文件夹；webpack插件 会以此文件夹名称 做出 [name].html

* login文件夹 下新建 login.html   index.js    login.scss；
注意这里的js一定要是index作为名称，否则报错；

* 在 index.js 中 引入 login.scss （否则不加载css）；
    import './login.scss'

* login.html 初始化结构 可以直接复制 ../page/template.html ；然后把 login 独立结构 放到 .content 下就可以了；
打包的时候 会自动把js和css 插入；

* 如果是顶部导航的页面；需要在header.js 中把新增 html 加入 navigation 数组中


### 怎么加载 img ？

   html中使用图片,因为webpack不能直接打包img标签的图片；所以要通过下面的方式插入图片

    <img src="../../images/a.png">

    改为

    <span img-src="a.png"></span>

初次加载 common.js会运行 tools.getImg() 方法 转换为打包图片；
如果你还要动态插入 html 并携带了图片；请在加载后，手动运行 tools.getImg()

### 所有的公共代码，都放在common 文件夹下；

### tools.js 下封装了全局工具方法，并暴露给全局Window对象；

### plugins 文件夹下 是用到的一些插件；




