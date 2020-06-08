/**
 * 图片绘制
 */
class CImage {
  constructor(props) {
    console.log("image constructor", props);
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log("draw image");
  }
}

export default CImage;
