export function max(value: any, max: number, inclusive: boolean) {
  return inclusive ? value <= max : value < max;
}
