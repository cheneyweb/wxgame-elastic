//资源文件加载器，确保在图片资源加载完成后才渲染
import { Resources } from './Resource.js'

export class ResourceLoader {
  constructor() {
    this.imageCount = 0
    this.audioCount = 0
    //导入资源
    this.map = new Map(Resources)
    for (let [key, src] of this.map) {
      let res = null
      if (src.split('.')[1] == 'png' || src.split('.')[1] == 'jpg') {
        this.imageCount++
        // H5创建image的API
        res = new Image()
        // 微信创建image的API
        // res = wx.createImage()
        res.src = src
      } else {
        this.audioCount++
        // H5创建audio的API
        res = new Audio()
        // 微信创建audio的API
        // res = wx.createInnerAudioContext()
        res.src = src
      }
      this.map.set(key, res)
    }
  }

  // 加载完成回调
  onload(cb) {
    let loadCount = 0
    for (let res of this.map.values()) {
      // 使this指向当前的ResourceLoader
      res.onload = () => {
        loadCount++
        if (loadCount >= this.imageCount) {
          cb(this.map)
        }
      }
    }
  }
}