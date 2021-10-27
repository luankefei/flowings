/**
 *  layper.helper
 *
 *  用于多绘图元素的图层合并
 */
import lib from "../lib";
import { loadImageList } from "../loader/image.loader";

import {
  ILayerWrapper,
  ILayerElement,
  IDrawElement,
  IImage,
  IText,
  ILine,
} from "../interface/canvas.type";

import CImage from "../canvas/image";
import CText from "../canvas/text";
import CLine from "../canvas/line";

class LayerHelper {
  layers: ILayerWrapper;
  renderQueue: ILayerElement[]; // 排序后准备渲染的队列
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

  // 加载所有静态资源
  load(): Promise<any> {
    if (!this.layers.images || this.layers.images.length === 0) {
      return Promise.resolve([]);
    }
    const paths = this.layers.images
      .map((item) => item.image_url)
      .filter((item) => item);

    return loadImageList(paths).then(
      (res: PromiseSettledResult<HTMLImageElement>[]) => {
        res.forEach((item, index) => {
          if (item.status === "fulfilled" && this.layers.images) {
            this.layers.images[index].buffer = item.value;
          }
        });

        return Promise.resolve(res);
      }
    );
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

    // 根据类型进行实例化
    const instancedLayers = lib.deepClone(this.layers);

    if (instancedLayers.images) {
      instancedLayers.images = instancedLayers.images.map(
        (item: IImage) => new CImage(item)
      );
    }

    if (instancedLayers.texts) {
      instancedLayers.texts = instancedLayers.texts.map(
        (item: IText) => new CText(item)
      );
    }

    if (instancedLayers.texts) {
      instancedLayers.lines = instancedLayers.lines.map(
        (item: ILine) => new CLine(item)
      );
    }

    // 从layer生成渲染队列, 默认先画图片，其次矩形 > 线条 > 文字
    if (!this.renderQueue.length && Object.keys(this.layers).length) {
      const queue = ["images", "rects", "lines", "texts"];
      this.renderQueue = queue.reduce(
        (prev, key) => prev.concat(instancedLayers[key] || []),
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

    // 根据 task 的类型进行渲染
    // TODO: 现在的渲染是阻塞式的，动画可能需要调整
    for (const task of this.renderQueue) {
      ((task as unknown) as IDrawElement).draw(ctx);
    }

    // 清空渲染队列
    this.locked = false;
    this.renderQueue = [];
    this.locked = true;

    return this;
  }
}

export default LayerHelper;
