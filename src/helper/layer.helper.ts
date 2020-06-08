/**
 *  layper.helper
 *
 *  用于多绘图元素的图层合并
 */
import { LayerWrapper, LayerElement } from "../interface/canvas.type";

class LayerHelper {
  layers: LayerWrapper;
  renderQueue: LayerElement[]; // 排序后准备渲染的队列
  sortedState: boolean;
  private locked: boolean; // this only enforced within the compiler

  constructor() {
    this.layers = {};
    this.renderQueue = [];
    this.sortedState = false;
    this.locked = true;

    // 只允许修改 layers
    return new Proxy(this, {
      get(target, name) {
        const privates = ["locked"];
        if (privates.includes(name.toString())) return undefined;
        return Reflect.get(target, name);
      },
      set(target, name, value) {
        const setable = ["layers", "locked", "sortedState"];
        if (!setable.includes(name.toString()) && target.locked) {
          throw new TypeError(`cannot set the ${name.toString()} property`);
        }
        target[name] = value;
        return true;
      },
    });
  }

  // 根据z轴排序，其他元素位置保持不变
  sort() {
    const array = this.renderQueue.slice(0);
    array.sort((a, b) => {
      a.z = a.z || 0;
      b.z = b.z || 0;
      if (a.z > b.z) return -1;
      if (a.z < b.z) return 1;

      return 0;
    });

    this.renderQueue = array;
  }

  prepareToRender() {
    // 解锁
    this.locked = false;

    // 从layer生成渲染队列, 默认先画图片，其次矩形 > 线条 > 文字
    if (!this.renderQueue.length && Object.keys(this.layers).length) {
      const queue = ["images", "rects", "lines", "texts"];
      this.renderQueue = queue.reduce(
        (prev, key) => prev.concat(this.layers[key] || []),
        []
      );
    }

    // 对渲染队列进行排序
    if (!this.sortedState && this.renderQueue.length) {
      this.sortedState = true;
      this.sort();
    }

    // 人性的枷锁
    this.locked = true;
  }

  // 执行渲染，清空渲染队列
  render(ctx: CanvasRenderingContext2D) {
    // before render
    this.prepareToRender();
    console.log("TODO: 执行渲染，清空渲染队列", this.renderQueue);
    this.renderQueue = [];
  }
}

export default LayerHelper;
