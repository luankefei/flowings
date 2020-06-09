/**
 * 文字绘制
 */

import { IText } from "../interface/canvas.type";

class CText implements IText {
  x = 0;
  y = 0;
  z = 0;
  size = 0;
  line_height = 0;
  font_style = 0;
  align = 0;
  limit = 0;
  color = "";
  font_family = "";
  content = "";

  constructor(props: IText) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log("draw text", this.content);
    ctx.fillText(this.content, this.x, this.y);
  }
}

export default CText;

// const withText = <T extends Constructor<IText>>(Base: T) =>
//   class extends Base {
//     constructor(...props) {
//       super(props);
//       Object.keys(props).forEach((key) => (this[key] = props[key]));
//       console.log('text constructor', props);
//     }
//     draw(ctx: CanvasRenderingContext2D) {
//       console.log('draw text');
//       ctx.fillText(this.content, this.x, this.y);
//     }
//   };
