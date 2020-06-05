/**
 * canvas.type
 *
 * 绘图合并相关的定义文件
 */

// Basic: createImage 接口的第一个参数
interface Basic {
  width;
  height;
  image_type: number;
  file_name;
  business_name;
  wechat_openid;
  trace_id: string;
  send: boolean;
}

// Image: 图片元素的配置
interface Image {
  x;
  y;
  z;
  width;
  height;
  expire;
  border_radius: number;
  name;
  image_url: string;
  resize: boolean;
  clip: Clip | undefined;
}

// Clip: 图片元素的裁剪配置
interface Clip {
  x;
  y;
  width;
  height: number;
}

// Text: 文字元素的绘图配置
interface Text {
  x;
  y;
  z;
  size;
  line_height;
  font_style;
  align;
  limit: number;
  color;
  font_family;
  content: string;
}

// Line: 线条元素的绘制配置
interface Line {
  x1;
  y1;
  x2;
  y2;
  line_width: number;
  color: string;
  dashed: boolean;
}

// Rect: 矩形元素的绘制配置
interface Rect {
  x;
  y;
  width;
  height: number;
  name;
  background: string;
  radius: number[];
}

type LayerElement = Image | Text | Line | Rect;

// 默认先画图片，其次矩形 > 线条 > 文字
interface ICreateImageParam {
  images: Image[];
  rects: Rect[];
  lines: Line[];
  texts: Text[];
}
