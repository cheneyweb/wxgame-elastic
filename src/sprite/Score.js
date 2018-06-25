import { DataStore } from '../base/DataStore.js'
/**
 * 计分器类
 */
export class Score {
  constructor(physics) {
    this.ctx = physics.ctx
    // 数据管理
    this.dataStore = DataStore.getInstance()
    this.dataStore.scoreCount = 0
  }

  // 绘制
  draw() {
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = '#464444'
    this.ctx.fillText(`分数 ${this.dataStore.scoreCount}`, 50, 20)
  }
  // 加分
  static increase() {
    DataStore.getInstance().scoreCount += 1
  }
}