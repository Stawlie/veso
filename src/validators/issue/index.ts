import { VesoValidatorName, VesoRecord } from "../utils";

export function createIssue<T extends VesoValidatorName>(
  name: T,
  method: VesoRecord[T],
  data?: Record<string, unknown>
) {
  console.log(name, method, data);
}
