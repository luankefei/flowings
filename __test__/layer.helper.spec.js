import LayerHelper from '../src/helper/layer.helper';

describe('LayerHelper 用于多绘图元素的图层合并', () => {
  const layerHelper = new LayerHelper();

  it('the instance has properties layers & renderQueue, typed array', () => {
    expect(
      Array.isArray(layerHelper.layers) &&
        Array.isArray(layerHelper.renderQueue)
    ).toBeTruthy();
  });

  it('layers will be sorted by field "z" automatically', () => {
    layerHelper.layers = [
      { x: 0 },
      { x: 1, z: 100 },
      { x: 2, z: 1 },
      { x: 3, z: 50 },
      { x: 4 },
      { x: 5 },
    ];

    layerHelper.sort();

    const sortedState = layerHelper.layers.every((item, index) => {
      return (
        index === layerHelper.layers.length - 1 ||
        item.z >= layerHelper.layers[index + 1].z
      );
    });

    expect(sortedState).toBeTruthy();
  });
});
