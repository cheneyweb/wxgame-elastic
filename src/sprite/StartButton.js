import { Sprite } from '../base/Sprite.js'
/**
 * 开始按钮类
 */
export class StartButton extends Sprite {
  constructor(physics) {
    const image = Sprite.getImage('startButton')
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