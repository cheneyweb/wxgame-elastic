import { ResourceLoader } from './src/base/ResourceLoader.js'
import { DataStore } from './src/base/DataStore.js'
import { Director } from './src/Director.js'

/**
 * 游戏入口
 */
export class App {
  constructor(canvas, options) {
    this.canvas = canvas                                             // 画布
    this.physics = { ...options, ctx: this.canvas.getContext('2d') } // 物理引擎
    this.director = new Director(this.physics)                       // 导演
    this.dataStore = DataStore.getInstance()
    // 资源加载
    new ResourceLoader().onload(res => {
      // 持久化资源
      this.dataStore.res = res
      // 加载精灵
      this.director.spriteLoad(res)
      // 运行游戏
      this.run()
    })
  }

  /**
   * 运行游戏
   */
  run() {
    // 注册事件
    this.registerEvent()
    // 物理渲染
    this.director.physicsDirect()
    // 精灵渲染
    this.director.spriteDirect()
    // 音乐播放
    this.dataStore.res.get('bgm').autoplay = true
  }

  /**
   * 重新加载游戏
   */
  reload() {
    // 物理渲染
    this.director.physicsDirect(true)
    // 精灵渲染
    this.director.spriteDirect(true)
  }

  /**
   * 注册事件
   */
  registerEvent() {
    // 使用=>使this指向Main类
    this.canvas.addEventListener('touchstart', e => {
      // 屏蔽事件冒泡
      e.preventDefault()
      // 如果游戏是结束状态，则重新开始
      if (this.dataStore.isGameOver) {
        // 重新初始化
        this.dataStore.isGameOver = false
        this.reload()
      }
    })
  }
}