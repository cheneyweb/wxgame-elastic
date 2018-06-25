// 精灵对象
import { BackGround } from './sprite/BackGround.js'
import { StartButton } from './sprite/StartButton.js'
import { Score } from './sprite/Score.js'
// 物理引擎绘制对象
import { Block } from './body/Block.js'
import { Border } from './body/Border.js'
import { Bridge } from './body/Bridge.js'
import { Aim } from './body/Aim.js'
// 数据管理
import { DataStore } from './base/DataStore.js'

/**
 * 导演类，控制游戏的逻辑
 */
export class Director {
  constructor(physics) {
    this.physics = physics
    this.dataStore = DataStore.getInstance()
  }
  // 加载精灵对象
  spriteLoad() {
    this.sprite = new Map()
    this.sprite['score'] = new Score(this.physics)
    this.sprite['startButton'] = new StartButton(this.physics)
    this.sprite['background'] = new BackGround(this.physics)
  }
  // 逐帧绘制
  spriteDirect(isReload) {
    if(isReload){
      this.dataStore.scoreCount = 0
    }
    // 绘制前先判断是否碰撞
    // this.check()
    // 游戏未结束
    if (!this.dataStore.isGameOver) {
      // 绘制游戏内容
      this.sprite['score'].draw()
      // this.sprite['background'].draw()
      // 自适应浏览器的帧率,提高性能
      this.animationHandle = requestAnimationFrame(() => this.spriteDirect())
    }
    //  游戏结束
    else {
      // 停止物理引擎
      this.physics.Matter.Engine.clear(this.physics.engine)
      this.physics.Matter.World.clear(this.physics.engine.world)
      this.physics.Matter.Render.stop(this.physics.render)
      // 停止绘制
      cancelAnimationFrame(this.animationHandle)
      // 结束界面
      this.sprite['score'].draw()
      this.sprite['startButton'].draw()
    }
  }
  // 物理绘制
  physicsDirect(isReload) {
    this.physics.Matter.Render.run(this.physics.render)
    if (!isReload) {
      new Aim(this.physics).draw().event()
      // new Bridge(this.physics).draw()
    }
    new Block(this.physics).draw().event().upMove()
    new Border(this.physics).draw()
  }
}