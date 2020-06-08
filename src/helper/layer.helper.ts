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

  // 根据z轴排序，其他元素位置保持不变
  sort() {
    const array = this.layers.slice(0);
    array.sort((a, b) => {
      a.z = a.z || 0;
      b.z = b.z || 0;
      if (a.z > b.z) return -1;
      if (a.z < b.z) return 1;

      return 0;
    });

    this.layers = array;
  }

  // 执行渲染，清空渲染队列
  render() {
    console.log("TODO: 执行渲染，清空渲染队列");
    this.renderQueue = [];
  }
}

export default LayerHelper;
