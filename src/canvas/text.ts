/**
 * 文字绘制
 */

import { IText } from "../interface/canvas.type";
import { objectify } from "tslint/lib/utils";
class CText<IText> {
  constructor(props: IText) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
    console.log("text constructor", props);
  }
  draw(ctx: CanvasRenderingContext2D) {
    console.log("draw text");
  }
}

export default CText;
