export const mm = (value: number): string => `${Math.round(value * 100) / 100} mm`;

export const toMeters = (valueMm: number): number => valueMm / 1000;
