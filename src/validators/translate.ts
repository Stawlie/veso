export let translate: Function | null = null;

export function setTranslate(translateFn: Function) {
  translate = translateFn;
}
