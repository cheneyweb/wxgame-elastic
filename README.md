# wxgame-elastic
**微信小游戏-弹一弾，纯Canvas原生实现，同时兼容微信小游戏和H5网页模式，引用Matter物理引擎，精简小巧，体积不超过1MB**

## 演示
![elastic-demo.gif](https://upload-images.jianshu.io/upload_images/5173617-bfdc01eefe371fa3.gif?imageMogr2/auto-orient/strip)

>H5模式演示版本：[https://cheneyweb.github.io/wxgame-elastic/dist/index.html](https://cheneyweb.github.io/wxgame-elastic/dist/index.html)

>H5模式二维码，手机扫码体验（微信扫码，浏览器扫码等都可以）![H5模式二维码.png](https://upload-images.jianshu.io/upload_images/5173617-28eadf06e69ad5fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>微信小游戏模式演示版本：需要打开微信开发者工具导入工程目录

## 工程结构

```js
├── App.js  弹一弾游戏入口
├── game.js  微信小游戏入口
├── game.json
├── project.config.json
├── res  资源集合
│   ├── background.png
│   ├── launch.mp3
│   ├── startbutton.png
│   └── xuemaojiao.mp3
└── src
    ├── Director.js  导演
    ├── base  精简版游戏引擎
    │   ├── Body.js  物理物体元素基类
    │   ├── DataStore.js  全局状态管理类
    │   ├── Resource.js  统一资源定义类
    │   ├── ResourceLoader.js  统一资源加载类
    │   ├── Sprite.js  普通物体渲染画笔类
    │   └── matter.js  物理引擎
    ├── body  物理物体元素
    │   ├── Aim.js  准星瞄准
    │   ├── Block.js  障碍方块
    │   ├── Border.js  边界墙体
    └── sprite  普通物体元素
        ├── BackGround.js  游戏背景
        ├── Score.js  游戏分数
        └── StartButton.js  开始按钮
```

## 构建

>微信小游戏模式

*说明：使用微信开发者工具打开wxgame-elastic目录即可，以下9个文件/目录可移除以减小体积*

```sh
.cache
dist
node_modules
.babelrc
.gitignore
index.html
package.json
package-lock.json
README.md
```

>H5网页游戏模式

*说明：执行以下构建命令后，启动 Chrome 访问 localhost:1234 即可进行游戏*

```sh
cd wxgame-elastic
npm run build
cp -r res dist
npm run dev
```



