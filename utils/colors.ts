export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#FFFFFF'; // default to white
  
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  
  return luminance > 0.5 ? '#212121' : '#FFFFFF';
};

// Generates a lighter or darker shade of a color
const shade = (color: number, percent: number) => {
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    return Math.round((t - color) * p) + color;
};

export const tintColor = (hex: string, percent: number): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const { r, g, b } = rgb;
    
    const tintedR = shade(r, percent);
    const tintedG = shade(g, percent);
    const tintedB = shade(b, percent);
    
    return `#${(tintedR).toString(16).padStart(2, '0')}${(tintedG).toString(16).padStart(2, '0')}${(tintedB).toString(16).padStart(2, '0')}`;
};
