export function unique(value: string, count: number) {
  return new Set(value).size >= count;
}
