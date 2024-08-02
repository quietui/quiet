import { nanoid } from 'nanoid';

/** Guarantees the returned value is between a minimum and maximum number. */
export function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/** Creates a unique id with an optional prefix. */
export function createId(prefix = '') {
  return prefix + nanoid();
}

/** Generates a random integer from min to max. */
export function randomInteger(min: number, max: number, seed?: number) {
  let num: number;

  if (typeof seed === 'number') {
    num = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);
  } else {
    num = Math.random();
  }

  return Math.floor(num * (max - min + 1)) + min;
}
