export const SIZE = 240;
export const CENTER = SIZE / 2;
export const MAX_R = 100;

export function polarPoint(r: number, theta: number) {
  return { x: CENTER + r * Math.sin(theta), y: CENTER - r * Math.cos(theta) };
}
