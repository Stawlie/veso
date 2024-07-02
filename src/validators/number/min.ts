export function min(value: any, min: number, inclusive: boolean) {
  return inclusive ? value >= min : value > min;
}
