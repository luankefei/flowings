/**
 * 线条绘制
 */

import { ILine } from "../interface/canvas.type";

class CLine implements ILine {
  z = 0;
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  line_width = 0;
  color = "transparent";
  dashed = false;

  constructor(props: ILine) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineWidth = this.line_width;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
    // console.log("draw text", this.content);
    // ctx.fillText(this.content, this.x, this.y);
  }
}

export default CLine;
