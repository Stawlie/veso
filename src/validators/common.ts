export function req(value: unknown) {
  if (Array.isArray(value)) {
    return !!value.length;
  }

  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === "boolean") {
    return true;
  }

  if (value instanceof Date) {
    return true;
  }

  if (typeof value === "object") {
    for (let _ in value) return true;
    return false;
  }

  return !!String(value).length;
}

export function len(value: unknown) {
  if (Array.isArray(value)) {
    return value.length;
  }

  if (typeof value === "object" && value !== null) {
    return Object.keys(value).length;
  }

  return String(value).length;
}

export function regex(...expr: RegExp[]) {
  return (value: unknown) => {
    return (
      !req(value) ||
      expr.every((reg) => {
        reg.lastIndex = 0;
        return reg.test(String(value));
      })
    );
  };
}

export function consoleWarn(text: string) {
  console.warn(`quasar-chain-rules: ${text} The value may be falsely valid!`);
}
