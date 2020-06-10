/**
 * 图片绘制
 */
import { IImage, IClip } from "../interface/canvas.type";

class CImage {
  x = 0;
  y = 0;
  z = 0;
  width = 0;
  height = 0;
  expire = 0;
  border_radius = 0;
  name = "";
  image_url = "";
  resize = true;
  clip: IClip | undefined = undefined;
  // image: HTMLImageElement | null = null;
  buffer: HTMLImageElement | null = null;

  constructor(props: IImage) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.buffer === null) {
      throw new Error(`image ${this.image_url} was not loaded`);
    }

    ctx.save();

    // 测试用流程，后面会把这个流程前置
    // 最好能把加载流程和绘图流程分割开
    ctx.drawImage(this.buffer, this.x, this.y, this.width, this.height);

    ctx.restore();
  }
}

export default CImage;
