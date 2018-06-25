import { Body } from '../base/Body.js'
import { Score } from '../sprite/Score.js'
import { DataStore } from '../base/DataStore.js'
/**
 * 方块
 */
export class Block extends Body {
  constructor(physics) {
    super(physics)
    this.blockCount = 5
    this.blockMap = {}
    this.blockHPMax = 10
    this.dataStore = DataStore.getInstance()
  }

  draw() {
    let physics = this.physics
    let lastBlockPositionX = 15
    let lastBlockPositionY = 20
    let blockArr = []
    // 生成随机数量方块
    for (let i = 0; i < this.blockCount; i++) {
      let hp = Math.floor(Math.random() * this.blockHPMax) + 1
      const block = physics.Matter.Bodies.rectangle(
        lastBlockPositionX + Math.floor(Math.random() * 20) + 15,
        physics.canvas.height - lastBlockPositionY - Math.floor(Math.random() * 50),
        30, 30, {
          isStatic: true,
          render: {
            visible: true,
            text: {
              content: hp,
              color: "white",
              size: 16,
              family: "Arial",
            }
            // sprite: {
            //   texture: 'res/ball.png',
            //   xScale: 0.1,
            //   yScale: 0.1
            // }
          },
        })
      block.hp = hp
      lastBlockPositionX += 50
      blockArr.push(block)
      this.blockMap[block.id] = block
    }
    // 将方块集合添加进入世界
    physics.Matter.World.add(physics.engine.world, blockArr)
    return this
  }

  // 方块被碰撞
  event() {
    let physics = this.physics
    // 方块被碰撞时事件
    physics.Matter.Events.on(physics.engine, 'collisionStart', (event) => {
      var pairs = event.pairs
      for (let pair of pairs) {
        // 被碰撞的方块生命减到0时，销毁
        if (this.blockMap[pair.bodyA.id]) {
          this.blockMap[pair.bodyA.id].hp--
          // 恢复重力
          this.physics.engine.world.gravity.y = 1
          Score.increase()
          pair.bodyA.render.text.content = this.blockMap[pair.bodyA.id].hp
          if (this.blockMap[pair.bodyA.id].hp <= 0) {
            physics.Matter.World.remove(physics.engine.world, this.blockMap[pair.bodyA.id])
            delete this.blockMap[pair.bodyA.id]
            // 所有方块打完判断游戏结束
            // if (Object.keys(this.blockMap).length == 0) {
            //   this.dataStore.isGameOver = true
            // }
          }
        }
        // pair.bodyB.render.fillStyle = '#333'
      }
    })
    return this
  }

  // 方块向上移动
  upMove() {
    let physics = this.physics
    let i = 0
    physics.Matter.Events.on(physics.engine, 'beforeUpdate', (event) => {
      for (let id in this.blockMap) {
        // body is static so must manually update velocity for friction to work
        // physics.Body.setVelocity(body, { x: px - this.blockMap[id].position.x, y: 0 })
        physics.Matter.Body.setPosition(this.blockMap[id], { x: this.blockMap[id].position.x, y: this.blockMap[id].position.y - 0.2 })
        if (this.blockMap[id].position.y < 30) {
          this.dataStore.isGameOver = true
          this.blockMap = {}
          physics.Matter.Events.off(physics.engine, 'beforeUpdate')
          break
        }
      }
      // 绘制新一行方块，且方块生命值上条
      if (i > 0 && i % 1000 == 0) {
        this.blockHPMax += 10
        this.draw()
      }
      i++
    })
  }
}