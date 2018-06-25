import { Sprite } from '../base/Sprite.js'
/**
 * 背景类
 */
export class BackGround extends Sprite {
  constructor(physics) {
    const image = Sprite.getImage('background')
    super(
      physics.ctx, image,
      (physics.canvas.width - image.width) / 2,
      (physics.canvas.height - image.height) / 2.5,
      image.width, image.height,
      0,
      0,
      image.width, image.height
    )
  }
}