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
  dpr: number;

  // 默认全屏创建
  constructor(id = "") {
    // Get the device pixel ratio, falling back to 1.
    this.dpr = window.devicePixelRatio || 1;
    this.canvas = id
      ? getCanvasElementById(id)
      : createCanvas(screen.availWidth, screen.availHeight, this.dpr);
    this.context = getCanvasRenderingContext2D(this.canvas);
    this.sprites = [];

    // Scale all drawing operations by the dpr, so you don't have to worry about the difference.
    this.context.scale(this.dpr, this.dpr);
  }
}

// TODO: 小程序的适配
// 从已存在的画布初始化
function getCanvasElementById(id: string) {
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
function createCanvas(width: number, height: number, dpr: number) {
  const node = document.createElement("canvas");
  const w = width || screen.width;
  const h = height || screen.height;

  node.id = "canvas";
  node.style.width = `${w}px`;
  node.style.height = `${h}px`;
  node.width = width * dpr;
  node.height = height * dpr;

  document.body.appendChild(node);

  return node;
}

export { Flowings, LayerHelper, createImage, Painter, Executor, Sprite };
export default Flowings;
