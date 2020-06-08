/**
 * 文字绘制
 */
class CText {
  constructor(props) {
    console.log("text constructor", props);
  }
  draw(ctx: CanvasRenderingContext2D) {
    console.log("draw text");
  }
}

export default CText;
