/**
 * canvas.type
 *
 * 绘图合并相关的定义文件
 */

export interface IDrawElement {
  draw: (ctx: CanvasRenderingContext2D) => undefined;
}

// Basic: createImage 接口的第一个参数
export interface IBasic {
  width: number;
  height: number;
  image_type: number;
  file_name: string;
  business_name: string;
  wechat_openid: string;
  trace_id: string;
  send: boolean;
}

// Image: 图片元素的配置
export interface IImage {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  expire: number;
  border_radius: number;
  name: string;
  image_url: string;
  resize: boolean;
  clip: IClip | undefined;
  buffer: HTMLImageElement | undefined;
  rotate: number;
  opacity: number;
}

// Clip: 图片元素的裁剪配置
export interface IClip {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Text: 文字元素的绘图配置
export interface IText {
  x: number;
  y: number;
  z: number;
  size: number;
  line_height: number;
  font_style: number;
  align: number;
  limit: number;
  color: string;
  font_family: string;
  content: string;
}

// Line: 线条元素的绘制配置
export interface ILine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  z: number;
  line_width: number;
  color: string;
  dashed: boolean;
}

// Rect: 矩形元素的绘制配置
export interface IRect {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  name: number;
  background: string;
  radius: number[];
}

export type ILayerElement = IImage | IText | ILine | IRect;

// 默认先画图片，其次矩形 > 线条 > 文字
export interface ILayerWrapper {
  images?: IImage[];
  rects?: IRect[];
  lines?: ILine[];
  texts?: IText[];
}

export type Constructor<T> = new (...args: any[]) => T;
