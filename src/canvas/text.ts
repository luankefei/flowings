/**
 * 文字绘制
 */

import { IText } from "../interface/canvas.type";

class CText implements IText {
  x = 0;
  y = 0;
  z = 0;
  size = 12;
  line_height = 0;
  font_style = "normal";
  font_weight = "normal";
  align = "left" as CanvasTextAlign;
  limit = 0;
  color = "";
  font_family = "sans-serif";
  content = "";
  baseline = "top" as CanvasTextBaseline;

  constructor(props: IText) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `normal normal ${this.font_weight} ${this.size}px ${this.font_family}`;
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillText(this.content, this.x, this.y);

    // 文字颜色
    if (this.color) {
      ctx.fillStyle = this.color;
    }

    console.log(
      "------------ draw text",
      this.content,
      ctx.font,
      `normal normal ${this.font_weight} ${this.size}px ${this.font_family}`
    );
    ctx.restore();
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
