/**
 *  layper.helper
 *
 *  用于多绘图元素的图层合并
 */

class LayerHelper {
  layers: LayerElement[];
  renderQueue: LayerElement[]; // 排序后准备渲染的队列

  constructor() {
    this.layers = [];
    this.renderQueue = [];
  }

  // 执行渲染，清空渲染队列
  render() {
    console.log("TODO: 执行渲染，清空渲染队列");
    this.renderQueue = [];
  }
}
