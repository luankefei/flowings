/**
 * canvas
 *
 * 图层合并业务的入口文件
 * 因为原来的项目叫做 laiye-canvas 和 golang-canvas 所以这里承接了历史包袱
 */

import LayerHelper from "../helper/layer.helper";

// createImage: 对外暴露的合并图层API
function createImage(basic: Basic, params: LayerWrapper) {
  console.log("basic", basic);
  console.log("params", params);

  // 这里打算做成 layerHelper 的语法糖
  const helper = new LayerHelper();
  helper.layers = params;

  // 注入 context
  // helper.render();

  // 使用 canvas 导出图片
}

export { createImage };
