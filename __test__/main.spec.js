import Flowings from '../src/main.ts';

test('getCanvasElement with incurrent id, to equal TypeError', () => {
  expect(() => {
    const flowings = new Flowings('flying-tiger');
  }).toThrowError(TypeError);
});

test('getCanvasElement with incurrent nodeType, to equal TypeError', () => {
  const node = document.createElement('div');
  node.id = 'flying-tiger';
  document.body.appendChild(node);
  expect(() => {
    const flowings = new Flowings(node.id);
  }).toThrowError(TypeError);
});

test('Flowings.canvas is instance of HTMLCanvasElement', () => {
  const flowings = new Flowings();
  expect(flowings.canvas instanceof HTMLCanvasElement).toBeTruthy();
});

test('new Flowings to get context type', () => {
  const flowings = new Flowings();
  expect(flowings.context.constructor).toBe(CanvasRenderingContext2D);
});
