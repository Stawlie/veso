import { ValidationRule } from "quasar";

declare class Veso {
  required(message?: string): Veso;
  end(): ValidationRule[];
}
