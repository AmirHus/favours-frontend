const {
    override,
    fixBabelImports,
    addLessLoader
} = require('customize-cra');

module.exports = override(
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true,//自动打包相关的样式 默认为 style:'css'
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({
        javascriptEnabled: true,
        // 将默认的主题色修改为绿色，其余的颜色变量可前往antd官网查询
        modifyVars:{'@primary-color':'#1DA57A'},
    }),
);
