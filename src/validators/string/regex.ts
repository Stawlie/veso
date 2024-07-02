export function regex(value: string, regex: RegExp) {
  return regex.test(value);
}
