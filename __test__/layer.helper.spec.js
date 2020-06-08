import LayerHelper from '../src/helper/layer.helper';

describe('LayerHelper 用于多绘图元素的图层合并', () => {
  const layerHelper = new LayerHelper();

  it('the instance has properties renderQueue, typed array', () => {
    expect(Array.isArray(layerHelper.renderQueue)).toBeTruthy();
  });

  it('the instance has property layers, is plain object', () => {
    const obj = layerHelper.layers;
    const isPlainObject =
      typeof obj === 'object' && obj !== null && obj.constructor === Object;
    expect(isPlainObject).toBeTruthy();
  });

  it('lock is a private property of layerHelper', () => {
    expect(layerHelper.locked).toBe(undefined);
  });

  it('layers will be sorted by field "z" automatically', () => {
    layerHelper.renderQueue = [
      { x: 0 },
      { x: 1, z: 100 },
      { x: 2, z: 1 },
      { x: 3, z: 50 },
      { x: 4 },
      { x: 5 },
    ];

    layerHelper.prepareToRender();

    const sortedState = layerHelper.renderQueue.every(
      (item, index) =>
        index === layerHelper.renderQueue.length - 1 ||
        item.z >= layerHelper.renderQueue[index + 1].z
    );

    expect(sortedState).toBeTruthy();
  });
});
