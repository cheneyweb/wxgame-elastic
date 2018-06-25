// 瞄准类
import { Body } from '../base/Body.js'
import { DataStore } from '../base/DataStore.js'

export class Aim extends Body {
  constructor(physics) {
    super(physics)
    this.dataStore = DataStore.getInstance()

    this.ballRadius = 10
    this.baseBallX = this.physics.canvas.width / 2
    this.baseBallY = this.ballRadius * 2

    this.x = physics.canvas.width / 2
    this.y = physics.canvas.height / 2
    this.balls = []
    this.ballAppends = []
    this.ballCount = 7
    this.ballAppendCount = 20
    this.isRending = false
    this.isForce = false
    this.inervalMax = 100
  }

  // 覆写绘制
  draw() {
    // if (this.isRending) {
    //   return
    // }
    // 清空场景
    this.physics.Matter.World.remove(this.physics.engine.world, this.balls)
    this.balls = []
    this.physics.Matter.World.remove(this.physics.engine.world, this.ballAppends)
    this.ballAppends = []
    // 重绘弹球
    this.drawBall()
    // 重绘制瞄准
    this.drawAim()
    return this
  }

  // 绘制瞄准
  drawAim() {
    if (this.isRending) {
      return
    }
    for (let i = 0; i < this.ballCount; i++) {
      const ball = this.physics.Matter.Bodies.circle(
        this.baseBallX + (this.x - this.baseBallX) * i / (this.ballCount - 1),
        this.baseBallY + (this.y - this.baseBallY) * i / (this.ballCount - 1),
        this.ballRadius, {
          isStatic: true,
          density: 0.04,
          friction: 0.01,
          frictionAir: 0.00001,
          restitution: 0.9,
          render: {
            visible: true,
            fillStyle: '#F35e66',
            strokeStyle: 'black'
          }
        })
      this.balls.push(ball)
    }
    this.physics.Matter.World.add(this.physics.engine.world, this.balls)
  }

  drawBall() {
    if (!this.isForce) {
      return
    }
    // 设定正在绘制弹球
    this.isRending = true
    this.ballAppends = []
    this.intervalCount = 0
    // 定时弹出球，且设定定时结束条件
    const interval = setInterval(() => {
      // 绘制弹球
      if (this.ballAppends.length < this.ballAppendCount) {
        const ballAppend = this.physics.Matter.Bodies.circle(
          this.baseBallX,
          this.baseBallY,
          this.ballRadius, {
            isStatic: false,
            density: 0.04,
            friction: 0.01,
            frictionAir: 0.00001,
            restitution: 0.9,
            render: {
              visible: true,
              fillStyle: '#F35e66',
              strokeStyle: 'black'
            }
          })
        ballAppend.isBall = true
        this.physics.Matter.World.add(this.physics.engine.world, ballAppend)
        const speed = {
          x: (this.x - this.baseBallX) / (this.y - this.baseBallY),
          y: 1
        }
        // 修正速度，确保从各个角度射出小球的速度差不多，原理是根据勾股定理计算出每个小球的斜边，以全屏斜边作为比对
        const fixRate = Math.sqrt(Math.pow(speed.x, 2) + Math.pow(speed.y, 2)) / Math.sqrt(Math.pow(this.physics.canvas.width, 2) + Math.pow(this.physics.canvas.height, 2)) * 1000
        // 给小球赋予推力
        this.physics.Matter.Body.applyForce(ballAppend, ballAppend.position, {
          x: speed.x / fixRate * 0.7,
          y: speed.y / fixRate * 0.7
        })
        this.ballAppends.push(ballAppend)
      }
      // 超过60%的球休眠则可以重新发射
      let bodies = this.physics.Matter.Composite.allBodies(this.physics.engine.world)
      let sleeping = bodies.filter((body) => body.isSleeping && body.isBall)
      // let isWorldSleeping = bodies.length === sleeping.length
      let isWorldSleeping = sleeping.length / this.ballAppends.length > 0.6 || this.intervalCount > this.inervalMax
      if (isWorldSleeping) {
        this.isRending = false
        this.isForce = false
        this.draw()
        clearInterval(interval)
      }
      this.intervalCount++
    }, 100)
  }

  // 事件触发
  event() {
    let physics = this.physics
    physics.canvas.addEventListener('touchmove', e => {
      this.eventHandler(e, { isForce: false })
    })
    physics.canvas.addEventListener('touchstart', e => {
      this.eventHandler(e, { isForce: false })
    })
    physics.canvas.addEventListener('touchend', e => {
      this.eventHandler(e, { isForce: true })
    })
    return this
  }

  // 事件处理
  eventHandler(e, options) {
    e.preventDefault()
    this.isForce = options.isForce
    // 刚触发弹射
    if (this.isForce && !this.isRending) {
      // 弹射一瞬间关闭重力
      this.physics.engine.world.gravity.y = 0
      this.dataStore.res.get('launch').play()
    }
    // 非弹射静止
    if (!this.isForce && !this.isRending) {
      this.x = e.touches[0].clientX
      this.y = Math.max(50, e.touches[0].clientY)
    }
    // 非动态渲染
    if (!this.isRending) {
      this.draw()
    }
  }
}