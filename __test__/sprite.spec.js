import Flowings from '../src/main';
import sprite from '../src/sprite';
import { BallPainter } from '../src/painter';

test('create a sprite', () => {
  const { canvas, context } = new Flowings();

  expect(() => {
    const ball = new sprite('ball', new BallPainter(75));

    ball.left = 320;
    ball.top = 160;
    ball.paint(context);
  }).not.toThrow();
});
