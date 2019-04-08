## 前排感谢原作者

github地址：
https://github.com/bluefox1688/vue-cli-multi-page


## 使用前注意事项

1、安装命令  推荐使用 node 6.x 安装

`npm install --registry=https://registry.npm.taobao.org`

2、如果遇到 npm ERR! chromedriver@2.34.1 install: `node install.js`  报错
运行 npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver 重新安装一遍

3、遇到node-sass 报错 运行 npm rebuild node-sass

4、新建页面，需重新`npm run dev`才可以正常访问新建的页面。

5、`npm run dev`将会自动在浏览器打开页面，如未正常打开，请访问完整的路径`http:// localhost:8091/views/temp/index.html`


## Build Setup
clone到本地仓之后，自行`npm **`，都是老司机了，这里也不重复了。


``` bash
# 安装依赖
npm install

# 调试环境 serve with hot reload at localhost:8091
npm run dev

# 生产环境 build for production with minification
npm run build

```
本地默认访问端口为8091，需要更改的童鞋请到项目目录文件`config/index.js`修改。


## 目录结构
``` 
webpack
 |---build
 |---src
     |---assets    #资源
     |---css/common.css  #css
     |---font/    #字体图标
     |---js/common.js    #自己定义的全局通用事件
     |---js/conf.js    #项目的配置
     |---js/Lib.js    #暴露接口给组件调用
     |---js/vueFilter.js    #注册vue的全局过滤器	
 |---components 组件
     |---hb-head.vue  head组件
|---views    #各个页面模块，模块名可以自定义哦！
     |---home    #一级目录
        |---list    #二级目录
             |---list.html
             |---list.js
             |---listApp.vue
     |---vuxDemo    #一级目录
        |---button    #二级目录
             |---button.html
             |---button.js
             |---buttonApp.vue	
        |---calendar    #二级目录
             |---calendar.html
             |---calendar.js
             |---calendarApp.vue		 
......
     
  ```

  从目录结构上，各种组件、页面模块、资源等都按类新建了文件夹，方便我们储存文件。其实我们所有的文件，最主要都是放在`views`文件夹里，以文件夹名为html的名称。
例如

``` stylus
|---vuxDemo    一级目录
 |---button    二级目录
   |---button.html
   |---button.js
   |---buttonApp.vue	
```
就是我们访问时的地址：

``` stylus
http://localhost:8091/views/vuxDemo/button.html
```

在`view`里二级文件夹，一个文件夹就是一个html，`js``vue``html` 都统一放在当前文件夹里，当然你也可以继续放其他的资源，例如css、图片等，webpack会打包到当前模块里。

还有一点要注意的，所有的目录都要求为二级，不能一个目录下为一级，另一个目录下有二级。

