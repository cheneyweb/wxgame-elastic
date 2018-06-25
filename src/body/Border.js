// 边界
import { Body } from '../base/Body.js'

export class Border extends Body {
  constructor(physics) {
    super(physics)
  }

  draw() {
    const physics = this.physics
    let bottomHeight = 10
    let leftWidth = 10
    const borderBottom = physics.Matter.Bodies.rectangle(
      physics.canvas.width / 2, physics.canvas.height - bottomHeight / 2,
      physics.canvas.width - leftWidth * 2, bottomHeight, {
        isStatic: true,
        render: {
          visible: true
        }
      })
    const borderLeft = physics.Matter.Bodies.rectangle(
      leftWidth / 2, physics.canvas.height / 2,
      leftWidth, physics.canvas.height, {
        isStatic: true,
        render: {
          visible: true
        }
      })
    const borderRight = physics.Matter.Bodies.rectangle(
      physics.canvas.width - leftWidth / 2, physics.canvas.height / 2,
      leftWidth, physics.canvas.height, {
        isStatic: true,
        render: {
          visible: true
        }
      })
    physics.Matter.World.add(physics.engine.world, [borderBottom, borderLeft, borderRight])
  }

}