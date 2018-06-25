// require('./src/base/weapp-adapter.js')
const Matter = require('./src/base/matter.js')
import { App } from './App.js'

window.Image = () => wx.createImage()

// 获取画布
const canvas = wx.createCanvas()
// 初始化物理引擎
const engine = Matter.Engine.create({
  enableSleeping: true
})
const render = Matter.Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: canvas.width,
    height: canvas.height,
    background: './res/background.png', // transparent
    wireframes: false,
    showAngleIndicator: false
  }
})
Matter.Engine.run(engine)
// Matter.Render.run(render)

// 初始化游戏
const physics = { Matter, engine, canvas, render }
new App(canvas, physics)









// const A = {
//   x: 0,
//   y: 0
// }

// const B = {
//   x: 150,
//   y: 0
// }

// var context = canvas.getContext('2d')
// context.fillStyle = 'red'

// var engine = Matter.Engine.create();

// var boxA = Matter.Bodies.rectangle(A.x, A.y, 30, 30);
// var boxB = Matter.Bodies.rectangle(B.x, B.y, 60, 60);
// var ground = Matter.Bodies.rectangle(0, canvas.height - 60, canvas.width, 10, { isStatic: true });

// Matter.World.add(engine.world, [boxA, boxB, ground]);
// setInterval(function () {
//   context.clearRect(0, 0, canvas.width, canvas.height)
//   Matter.Events.trigger(engine, 'tick', { timestamp: engine.timing.timestamp })
//   Matter.Engine.update(engine, engine.timing.delta)
//   Matter.Events.trigger(engine, 'afterTick', { timestamp: engine.timing.timestamp })
//   console.info(boxA)
//   context.fillRect(boxA.position.x, boxA.position.y, 30, 30)
//   context.fillRect(boxB.position.x, boxB.position.y, 60, 60)
//   context.fillRect(0, canvas.height - 60, canvas.width, 10)
//   // console.log('boxA', boxA.position);
//   // console.log('boxB', boxB.position);
// }, 50)