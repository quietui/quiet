/**
 * Converts a hex color string to an RGB color object.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number; a: number } {
  // Remove # if present
  hex = hex.replace('#', '');

  // Handle shorthand hex format
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('');
  }

  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Default values for when parsing fails
  const defaultColor = { r: 0, g: 0, b: 0, a: 1 };

  // Check if any RGB values are invalid
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return defaultColor;
  }

  // Return alpha if this is a hex8 string
  if (hex.length === 8) {
    const a = parseInt(hex.substring(6, 8), 16) / 255; // Convert to 0-1 range
    const aRounded = Math.round(a * 100) / 100; // Round to 2 decimal places

    return isNaN(a) ? defaultColor : { r, g, b, a: aRounded };
  }

  // Return RGB only for standard hex
  return { r, g, b, a: 1 };
}

/**
 * Converts a hex color string to an RGB string.
 */
export function hexToRgbString(hex: string) {
  const { r, g, b, a } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b}, ${a})`;
}
