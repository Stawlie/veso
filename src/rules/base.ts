abstract class RulesBase {
  private _rules = [];

  constructor() {}

  abstract required(message?: string): this;
}

export default RulesBase;
