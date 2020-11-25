
    ## 基于Mpvue的记事本小程序
       - 技术
         - Vue，Vuex
         - 原生小程序基础
         - Sass
    ## 关于小程序 mpvue

   - mpvue的语法基于vue和小程序

   * 安装

     - npm install -global vue-cli （mpvue是基于vue-cli2构建的，现在我们的安装vue-cli都是3版本的，如果你仍要使用旧版本的vue init 功能，你可以全局安装一个桥接工具的)

     ```js
     npm install -g @vue/cli-init  运行效果将会和vue-cli@2.x相同
     ```

     - 有了vue-cli2.0环境之后创建mpvue的命令为

     ```js
     vue init mpvue/mpvue-quickstart 项目名称
     ```

     * 在控制台上运行之会经过以下几个步骤 

     ```js
     ? Project name my-project
     ? wxmp appid touristappid  //如果有小程序密钥并且打算发布小程序可以填写 不过不填后面可以补救 
     ? Project description A Mpvue project
     ? Author skaper <1686048631@qq.com>
     ? Vue build runtime
     ? Use Vuex? Yes
     ? Use ESLint to lint your code? No
     ```

     - 创建完之后打开package文件后的会发现scripts下有多的脚本，其实首页中已经介绍,如下

     ```js
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     // 如果要开发其他平台的命令只需要运行 npm run dev:平台编号 即可   
     ```

     - 创建的小程序可以是多个平台的也无需每个平台都要创建
     - 下面运行npm run dev 会发现在文件目录中有新生成了一个dist的文件打开之后与小程序的原生目录一样，由于小程序不能在网页上浏览，最后我们需要将dist文件导入到微信开发者工具中并显示，这里不用担心如何更新dist文件代码测试，每当我们更改一次vue代码dist下面的内容就会自动更新一次，但是当新增页面的时候我们必须要重启以下npm run dev,类似于热更新，所以使用mpvue开发小程序我们就像开发vue项目一样只需要关注src目录就可以了。

  * 目录解析

    - App.vue 是将实例直接挂载的并没有挂载到节点中去，因为小程序是没有节点的
    - app.json 与微信小程序的app.json 一样  

  * 在开发时使用vue语法即可 div就用div就可以不用改用view

  * 框架原理 mpvue 保留了vue.runtime核心，无缝继承了Vue.js的基础能力

    - dmpvue-template-compiler提供了vue的模板语法转化到小程序的wxml语法的能力
    - 修改了vue的构建配置，是指构建出符合小程序项目结构的代码格式：json/wxml/wxss/js文件

  * 生命周期

    - 在的mpvue中vue的生命周期与小程序的什么周期时都可以使用的，但是当vue与小程序的生命周期混用的时候，小程序的生命周期顺序就与原生不一样，具体看[官方文档](http://mpvue.com/mpvue/)

  * 事件

    ```js
    tap：点击事件；
    
    longtap：长按事件；
    
    touchstart：触摸开始；
    
    touchend：触摸结束；
    
    touchcansce：取消触摸；
    
    ....
    //等其他事件必须前面用 @  绑定，遵循vue
    ```

    * 添加pages页面必须重启服务才有效
    * 常见问题
      - 原生获取路由参数小程序在page onLoad时候传递的options，mpvue在所有页面的组件内可以通过this.$root.$mp.query获取
      - 原生获取app onLaunch/onShow传递的options,mpvue通过this.$root.$mp.appOptions进行获取
      - 捕获app的onError
        由于onError并不是完整意义的生命周期，所以提供一个捕获错误的方法，在app的根组件上添加名为onError的回调的函数即可
      - vue-router支持吗
        路由时不能支持的，因为小程序无法动态的插入和控制节点，几乎无法实现，而且小程序对页面的切换性能做了很多优化，页面切换体验也好很多，所以使用vue-router也不那么必要
      - 为什么新增页面，没有反应  
        因为webpack编译的文件由配置的entry决定的，新增页面并没有添加进entry所以需要手动npm run dev重启服务，考虑不时高频操作，所以还可以忍受
      - 能不能引用第三方的UI库
        原理上时可以的，但时要去掉Dom和Bom相关的API操作，还要去掉mpvue不支持一些vue特性，小程序不支持的css选择器等,去掉这些就可以使用了，欢迎大家贡献mpvue的UI的组件库。
      - 单文件组件中style支持scss/less写法
        sass需要下载node-sass 
        less推荐下载比较低的版本 npm install less less-loader@5.0.0   
      - 以关键字为组件名的组件时不能被使用的   
      - 浪子回头，为时不晚！！！
