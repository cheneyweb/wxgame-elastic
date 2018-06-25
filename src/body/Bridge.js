import { Body } from '../base/Body.js'

/**
 * 桥梁
 */
export class Bridge extends Body {
  constructor(physics) {
    super(physics)
  }

  draw() {
    const physics = this.physics
    // add bodies
    var group = physics.Matter.Body.nextGroup(true);
    // 桥梁主体
    var bridge = physics.Matter.Composites.stack(160, 290, 12, 1, 0, 0, function (x, y) {
      return physics.Matter.Bodies.rectangle(x - 20, y, 53, 20, {
        collisionFilter: { group: group },
        chamfer: 5,
        density: 0.005,
        frictionAir: 0.05,
        render: {
          fillStyle: '#575375'
        }
      });
    });

    physics.Matter.Composites.chain(bridge, 0.3, 0, -0.3, 0, {
      stiffness: 1,
      length: 0,
      render: {
        visible: false
      }
    });

    // var stack = physics.Matter.Composites.stack(250, 50, 6, 3, 0, 0, function (x, y) {
    //   return physics.Matter.Bodies.rectangle(x, y, 50, 50, physics.Matter.Common.random(20, 40));
    // });

    physics.Matter.World.add(physics.engine.world, [
      bridge,
      // stack,
      // physics.Matter.Bodies.rectangle(30, 490, 220, 380, {
      //   isStatic: true,
      //   chamfer: { radius: 20 }
      // }),
      // physics.Matter.Bodies.rectangle(770, 490, 220, 380, {
      //   isStatic: true,
      //   chamfer: { radius: 20 }
      // }),
      physics.Matter.Constraint.create({
        pointA: { x: 0, y: 400 },
        bodyB: bridge.bodies[0],
        pointB: { x: -25, y: 0 },
        length: 2,
        stiffness: 0.9
      }),
      physics.Matter.Constraint.create({
        pointA: { x: this.physics.canvas.width, y: 400 },
        bodyB: bridge.bodies[bridge.bodies.length - 1],
        pointB: { x: 25, y: 0 },
        length: 2,
        stiffness: 0.9
      })
    ]);
  }
}