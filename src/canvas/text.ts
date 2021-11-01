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
  color = "#000";
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
    ctx.fillStyle = this.color;

    // 按照对齐方式，修正坐标起点
    if (this.align !== "left") this.x = this.align === "center" ? this.x + this.limit / 2 : this.x + this.limit;
    if (!this.limit) return ctx.fillText(this.content, this.x, this.y);

    // 多行文本渲染
    const charWidth = ctx.measureText(this.content).width / this.content.length;

    // 按照当前文字宽度计算余数矫正一次
    const limit = Math.floor(this.limit / charWidth);
    const lineCount = Math.ceil(this.content.length / limit);

    for (let i = 0; i < lineCount; i += 1) {
      const line = this.content.substring(limit * i, limit * i + limit);
      ctx.fillText(line, this.x, this.y + i * this.line_height);
    }

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
