/**
 * 图片绘制
 */
import { IImage } from "../interface/canvas.type";

class CImage<IImage> {
  constructor(props: IImage) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
    console.log("image constructor", props);
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log("draw image", this);
  }
}

export default CImage;
