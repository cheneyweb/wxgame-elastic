# wxgame-elastic
微信小游戏-弹一弾，纯Canvas实现，引用Matter物理引擎，精简小巧，原生渲染

>微信小游戏模式

使用微信开发者工具打开wxgame-elastic目录即可，以下9个文件/目录可移除以减小体积

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

```sh
cd wxgame-elastic
npm run build
cp -r res dist
npm run dev
```
打开Chrome访问localhost:1234即可进行游戏


