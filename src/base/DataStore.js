// 数据管理
export class DataStore {
  // 单例
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }
  // 构造存储容器
  constructor() {
    this.map = new Map()
    this.res = null         // 游戏资源
    this.isGameOver = false // 游戏进度标识
    this.scoreCount = 0     // 游戏分数
  }
  // 存入
  put(key, value) {
    // 如果传入的参数是函数，则new function
    if (typeof value === 'function') {
      value = new value()
    }
    this.map.set(key, value)
    // 可链式使用
    return this
  }
  // 取出
  get(key) {
    return this.map.get(key)
  }
  //销毁
  destroy() {
    for (let value of this.map.values()) {
      value = null
    }
  }
}