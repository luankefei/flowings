/**
 * 绘图库入口文件
 * 核心设计思路是，尽量贴近原生API。只做必要的限制，功能在原生 canvas 上进行增强
 */
class Flowings {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  sprites: any[];

  // 默认全屏创建
  constructor(id = "") {
    this.canvas = id
      ? getCanvasElementById(id)
      : createCanvas(screen.availWidth, screen.availHeight);
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

// 创建画布
function createCanvas(width: number, height: number) {
  const node = document.createElement("canvas");
  node.id = "canvas";
  node.width = width || screen.width;
  node.height = height || screen.height;
  document.body.appendChild(node);

  return node;
}
