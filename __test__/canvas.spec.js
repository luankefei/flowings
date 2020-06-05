import { createImage } from '../src/canvas/canvas';

it('createImage has 2 params', () => {
  expect(createImage.length).toBe(2);
});

it('called createImage params', () => {
  expect(() => {
    createImage();
  }).not.toThrow();
});
