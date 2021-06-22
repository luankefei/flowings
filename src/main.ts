/**
 * main
 *
 * 绘图库入口文件
 * 核心设计思路是，尽量贴近原生API。只做必要的限制，功能在原生 canvas 上进行增强
 */
import { createImage } from "./canvas/canvas";
import LayerHelper from "./helper/layer.helper";

// from not-snow-mountain
import * as Painter from "./painter";
import Sprite from "./sprite";
import * as Executor from "./executor";

class Flowings {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  sprites: any[];

  // 默认全屏创建
  constructor(id = "") {
    this.canvas = id
      ? getCanvasElementById(id)
      : createCanvas(screen.availWidth, screen.availHeight);
    this.context = getCanvasRenderingContext2D(this.canvas);
    this.sprites = [];
  }
}

// 从已存在的画布初始化
function getCanvasElementById(id: string) {
  // TODO: 小程序的适配
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  if (!canvas || canvas.constructor !== HTMLCanvasElement) {
    throw new TypeError(
      `The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`
    );
  }
  return canvas;
}

// 获取绘图上下文
function getCanvasRenderingContext2D(node: HTMLCanvasElement) {
  const context = node.getContext("2d");
  if (context === null) {
    throw new Error(
      "This browser does not support 2-dimensional canvas rendering contexts."
    );
  }
  return context;
}

// 创建画布
function createCanvas(width: number, height: number) {
  const node = document.createElement("canvas");
  node.id = "canvas";
  node.width = width || screen.width;
  node.height = height || screen.height;
  document.body.appendChild(node);

  return node;
}

export { Flowings, LayerHelper, createImage, Painter, Executor, Sprite };
export default Flowings;
