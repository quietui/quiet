/** Guarantees the returned value is between a minimum and maximum number. */
export function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/** Creates a unique id with an optional prefix. */
export function createId(prefix = '') {
  return prefix + crypto.randomUUID().slice(-8);
}
