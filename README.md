# 一个打包多页面的webpack脚手架

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

## 怎么增加你的东西

### 增加一个 login 页面

* 在page下 新建 login 文件夹；webpack插件 会以此文件夹名称 做出 [name].html

* login文件夹 下新建 login.html   index.js    login.scss；
注意这里的js一定要是index作为名称，否则报错；

* 在 index.js 中 引入 login.scss （否则不加载css）；
    import './login.scss'

* login.html 初始化结构 可以直接复制 ../page/template.html ；然后把 login 独立结构 放到 .content 下就可以了；
打包的时候 会自动把js和css 插入；

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



## bug

初次打包可能会出现以下bug

![Alt bug](https://github.com/lidog/webpackFrames/blob/master/images/1.png)
![Alt fixBug](https://github.com/lidog/webpackFrames/blob/master/images/2.png)


这是因为安装依赖的时候，多了一个 webpack3.11.0；因为版本不一样导致找不到变量；
去 node_modules 下删除掉 这个 _webpack3.11.0 ;
再次运行

   npm run view



