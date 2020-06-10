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
  buffer: HTMLImageElement | null = null;
  rotate = 0;
  opacity = 1;

  constructor(props: IImage) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.buffer === null) {
      throw new Error(`image ${this.image_url} was not loaded`);
    }

    ctx.save();

    // 设置全局透明度
    ctx.globalAlpha = this.opacity;

    let startX = 0;
    let startY = 0;
    let imageWidth = this.buffer.width;
    let imageHeight = this.buffer.height;

    // 画布旋转，画布旋转后坐标需重新计算
    if (this.rotate) {
      ctx.beginPath();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate((this.rotate * Math.PI) / 180);

      this.x = -this.width / 2;
      this.y = -this.height / 2;
    }

    // 圆角
    if (this.border_radius) {
      this.clipRound(
        ctx,
        this.width,
        this.height,
        this.x,
        this.y,
        this.border_radius
      );
    }

    // 图片裁剪
    if (this.clip) {
      startX = this.clip.x;
      startY = this.clip.y;

      imageWidth = imageWidth - (this.buffer.width - this.clip.width);
      imageHeight = imageHeight - (this.buffer.height - this.clip.height);
    }

    // 最好能把加载流程和绘图流程分割开
    ctx.drawImage(
      this.buffer,
      startX,
      startY,
      imageWidth,
      imageHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.restore();
  }

  clipRound(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    x: number,
    y: number,
    radius: number | number[]
  ) {
    const r = typeof radius === "number" ? radius : undefined;

    ctx.beginPath();
    ctx.moveTo(x + (r || radius[1]), y);

    // 右上 -> 右下 -> 左下 -> 左上
    ctx.arcTo(x + width, y, x + width, y + height, r || radius[1]);
    ctx.arcTo(x + width, y + height, x, y + height, r || radius[2]);
    ctx.arcTo(x, y + height, x, y, r || radius[3]);
    ctx.arcTo(x, y, x + width, y, r || radius[0]);

    ctx.closePath();
    ctx.clip();
  }
}

export default CImage;
