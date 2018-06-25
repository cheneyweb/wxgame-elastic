import { DataStore } from './DataStore.js'
export class Sprite {
  constructor(ctx, img, x = 0, y = 0, w = 0, h = 0, srcX = 0, srcY = 0, srcW = 0, srcH = 0, ) {
    this.ctx = ctx
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  /**
   * 绘制图片
   * img 传入Image对象
   * srcX 要剪裁的起始X坐标
   * srcY 要剪裁的起始Y坐标
   * srcW 剪裁的宽度
   * srcH 剪裁的高度
   * x 放置的x坐标
   * y 放置的y坐标
   * w 要使用的宽度
   * h 要使用的高度
   */
  draw(img = this.img,
    x = this.x, y = this.y, w = this.w, h = this.h,
    srcX = this.srcX, srcY = this.srcY, srcW = this.srcW, srcH = this.srcH) {
    this.ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h)
  }

  static getImage(key) {
    return DataStore.getInstance().res.get(key)
  }
}