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
  image: HTMLImageElement | null = null;

  constructor(props: IImage) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const p: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => resolve(image);
      image.onerror = (err) => {
        const imageNoCross = new Image();
        imageNoCross.onload = () => resolve(image);
        imageNoCross.onerror = () => reject(err);
        imageNoCross.src = this.image_url;
      };
      image.src = this.image_url;
    });

    p.then((image: HTMLImageElement) => {
      this.image = image;

      // 测试用流程，后面会把这个流程前置
      // 最好能把加载流程和绘图流程分割开
      console.log("draw image", this.image_url);
      ctx.drawImage(image, this.x, this.y, this.width, this.height);

      ctx.restore();
    });
  }
}

export default CImage;
