//resolve是用来处理绝对路径的方法
const { resolve } = require('path');
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
//设置nodejs的环境变量
process.env.NODE_ENV = 'development'
module.exports = {
    //入口起点
    entry : ['./src/js/main.js','./src/index.html'],
    //输出
    output: {
        //输出文件名
        filename: 'js/main.js',
        //输出路径 __dirname是nodejs里的变量表示当前配置文件的目录绝对路径
        path: resolve(__dirname,'bulid')
    },
    //loader的配置
    module: {
        //详细的配置
        rules: [
            {
                //匹配文件
                test: /\.css$/,
                //use表示使用那些loader
                use: [
                    //创建style标签,将js中的样式资源插入到head标签生效
                    //'style-loader',
                    //取代styleloader
                    {
                        loader: miniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                    },
                    //将css文件变成模块加载到js中
                    "css-loader",
                    /*
                    css兼容性处理 使用postcss-loader postcss-preset-env
                    直接写postcss-loader表示使用默认值
                    postcss-preset-env帮助postcss找到browserslist里的配置并加载指定的css样式
                    默认使用生产模式,开发模式需配置nodejs的环境变量
                    process.env.NODE_ENV= 'development'
                    */
                   {
                       loader: 'postcss-loader',
                       options: {
                           ident: 'postcss',
                           plugins: () => [
                               //使用postcss-preset-env
                               require('postcss-preset-env')()
                           ]
                       }
                   }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                //下载url-loader和file-loader
                loader: 'url-loader',
                options: {
                    //图片大小小于8k会被base64处理--减少请求数量减轻服务器压力会增大图片体积
                    //一般使用8-12kb使用base64
                    limit: 8 * 1024,
                    //url-loader使用es6模块html-loader使用commonjs,报错
                    //解决方案关闭es6模块,webpack4.4没有此问题
                    esModule:false,
                    //给图片重命名取图片的哈希值10位ext源文件的扩展名
                    name: '[hash:10].[ext]',
                    //输出路径
                    outputPath: 'img'
                }
            },
            {
                test: /.html$/,
                //处理html中的img图片
                loader: 'html-loader'
            },
            {
                //处理其他资源
                exclude: /\.(html|css|js|jpg|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            },
            {
                //语法检查 eslint-loader eslint
                test: /\.js$/,
                //不检查第三方库
                exclude: /node_modules/,
                //优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }

            },
            {
                //js基本兼容性处理babel-loader @babel @babel/preset-env
                //按需兼容性处理core-js
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                //按需加载
                                useBuiltIns: 'usage',
                                //指定core-js版本
                                corejs: {
                                    version: 3,
                                },
                                //指定兼容性到那个版本的浏览器
                                targets: {
                                    chrome:'60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    //错误提示
    devtool: 'eval-source-map',
    //插件的配置
    plugins:[
        //plugins的配置
        //清理build路径
        new CleanWebpackPlugin(),
        //html-webpack-plugin创建空的html并创建一个script标签等引入打包后的所有输出文件
        new HtmlWebpackPlugin({ 
            //复制源html文件并自动引入所有生产的资源,并输出到build文件
            template: './src/index.html',
            //压缩html
            minify: {
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true
            }

        }),
        new miniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new optimizeCssAssetsWebpackPlugin()
    ],
    //打包环境
    mode: 'development',
    //开发服务器dev-server 热打包
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        //启动gzip压缩
        compress: true,
        //端口号
        port: 3000,
        //自动打开浏览器
        open: true,
        //开启HMR
        hot: true
    }
}