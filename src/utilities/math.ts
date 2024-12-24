import { nanoid } from 'nanoid';

/** Guarantees the returned value is between a minimum and maximum number. */
export function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/** Creates a unique ID with an optional prefix. */
export function createId(prefix = '') {
  return prefix + nanoid();
}

/** Generates a random integer from min to max. */
export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Returns a function that generates a seeded, pseudo random number between 0-1 every time it's called. */
export function seededNumberGenerator(seed: number) {
  return function () {
    seed = Math.sin(seed) * 10000;
    seed -= Math.floor(seed);
    return seed;
  };
}
