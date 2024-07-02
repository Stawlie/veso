export function notIn(value: Date, notIn: Date[]) {
  return !notIn.map((item) => item.getTime()).includes(value.getTime());
}
