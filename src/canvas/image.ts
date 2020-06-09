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

  constructor(props: IImage) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
    // console.log('image constructor', props);
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log("draw image", this.image_url);
  }
}

export default CImage;
