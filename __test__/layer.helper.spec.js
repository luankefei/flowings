import LayerHelper from '../src/helper/layer.helper';

describe('LayerHelper 用于多绘图元素的图层合并', () => {
  it('the LayerHelper instance has properties layers & renderQueue, typed array', () => {
    const layerHelper = new LayerHelper();
    expect(
      Array.isArray(layerHelper.layers) &&
        Array.isArray(layerHelper.renderQueue)
    ).toBeTruthy();
  });
});
