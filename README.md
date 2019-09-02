# 开发规范
  ## 网络请求
    使用util/request.js中的request函数进行请求, 具体参见文件.
  ## 代码规范
    使用2空格长度的tab进行缩进.
    js 代码分号按照自己习惯.
    css 的 class 类名要求有明确的语义化. 多个单词之间以_分隔.例如: 
  ## UI界面
    本次开发UI界面质量不高, 很多地方尺寸不一, 整体风格凌乱. 要求:

      奇数尺寸 + 1 变成偶数. 界面实现与ui大致保持一致.

      字体, 颜色, 背景色, 使用app.wxss里面的配置类, 如果没有需要的, 在里面添加之后使用.

  ## 组件封装
    组件化开发需要深入实践. 组件, 模块, 都需要封装完善, 适用性越高, 封装难度越大, 但是这是提升自己的必经之路.
    组件按已有组件编写, 静态资源如字体, 图标icon存放在assets目录下.