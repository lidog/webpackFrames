
const path = require('path');
// const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const { AutoWebPlugin  } = require('web-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const autoWebPlugin = new AutoWebPlugin('./page',{
    template:function (pageName) {
        return './page/'+pageName+'/'+pageName+'.html'
    },
    postEntrys:[
        "./common/common.scss",
        "./common/header/header.scss",
        "./common/footer/footer.scss",
        "./plugins/font/iconfont.css",
        "./plugins/notie-master/dist/notie.min.css",
        "./common/common.js",
        "./common/header/header.js",
        "./common/footer/footer.js",
    ],
    commonsChunk:{
        name:'common',
    }
})

module.exports = {
    entry: autoWebPlugin.entry({
        // 这里可以加入你额外需要的 Chunk 入口
    }),
    output:{
        // filename: '[name]_[chunkhash:8].js',
        filename: '[name].js',
        path:path.resolve(__dirname,'./dist'),
    },
    externals: {
        jquery: 'jQuery',
    },
    resolve:{
        alias:{
            common:'./common',
            images:'./images',
        },
    },
    devtool:'inline-source-map',
    module: {
        rules: [
            {test: require.resolve("jquery"), use: "expose-loader?$"},
            {test: require.resolve("jquery"), use: "expose-loader?jQuery"},
            {
                test: /\.html$/,
                use: {
                    loader: 'html-withimg-loader'
                }
            },
            {
                test:/\.(jpg|png|svg|gif|eot|ttf|woff)$/i,
                use:[{
                    loader: 'url-loader',
                    options: {
                        // 15KB 以下的文件采用 url-loader 转base64；否者用url-loader
                        limit: 5*1024,
                        // 否则采用 file-loader，默认值就是 file-loader
                        fallback: 'file-loader',
                        //输出到 dist下的images 文件夹
                        outputPath:"./images"
                    }
                }]
            },
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                // use: ['style-loader', 'css-loader?minimize'],//可以通过加 url参数的方式 添加参数；
                use:ExtractTextPlugin.extract({
                    use: ['css-loader?minimize'],
                })
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname,"./node_modules"),
                include: [path.resolve(__dirname, "./common")],
            },
            {
                test:/\.scss/,
                // use:['style-loader','css-loader','sass-loader'],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader','sass-loader']
                })
            }
        ]
    },
    plugins:[
        //清理缓存
        new CleanWebpackPlugin(['dist']),
        //单独提取 css 作为一个文件，加 [name]_[contenthash:8].css 表示文件名后面加八位hash, name 表示入口文件的名字
        new ExtractTextPlugin({
            // filename: `[name]_[contenthash:8].css`
            filename: `[name].css`
        }),
        autoWebPlugin,
        new DefinePlugin({
            // 定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
<<<<<<< HEAD
         new UglifyJsPlugin({
=======
       /*  new UglifyJsPlugin({
>>>>>>> 8e0a2c3afcc0bb89122aaba9e8898aa94f0fb91b
             // 最紧凑的输出
             beautify: false,
             // 删除所有的注释
             comments: false,
             compress: {
                 // 在UglifyJs删除没有用到的代码时不输出警告
                 warnings: false,
                 // 删除所有的 `console` 语句，可以兼容ie浏览器
                 drop_console: true,
                 // 内嵌定义了但是只用到一次的变量
                 collapse_vars: true,
                 // 提取出出现多次但是没有定义成变量去引用的静态值
                 reduce_vars: true,
             }
         }),
    ]
}

