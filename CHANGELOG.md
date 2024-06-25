# Changelog

## 1.0.0-alpha.6

- Added String, Number and Date `notIn` validator.

```ts
import { v } from "veso";

const notIn = v.string().notIn(["test1", "test2"]);

notIn.validate("somestring"); // => true
notIn.validate("test1"); // => "The value is not allowed!"
notIn.validate("test2"); // => "The value is not allowed!"
```

```ts
import { v } from "veso";

const notIn = v.number().notIn([1, 2]);

notIn.validate(3); // => true
notIn.validate(1); // => "The value is not allowed!"
notIn.validate(2); // => "The value is not allowed!"
```

```ts
import { v } from "veso";

const notIn = v.date().notIn([new Date(10), new Date(100)]);

notIn.validate(new Date(1)); // => true
notIn.validate(new Date(10)); // => "The value is not allowed!"
notIn.validate(new Date(100)); // => "The value is not allowed!"
```

## Previous Releases

### 1.0.0-alpha.5

- Added `corecion` for `string`, `number` and `date` validators.

```ts
import { v } from "veso";

v.coerce.string(); // => VesoString instance with corecion
v.coerce.number(); // => VesoNumber instance with corecion
v.coerce.date(); // => VesoDate instance with corecion
```

### 1.0.0-alpha.4

- Added String `numeric` validator.

```ts
import { v } from "veso";

const numeric = v.string().numeric();

numeric.validate("10.33"); // => true
numeric.validate("10."); // => "The value must be a number!"
numeric.validate("notanumber"); // => "The value must be a number!"
```

Optionaly, you can pass in an additional argument to provide a custom error message.

- Added String `alpha` validator.

```ts
import { v } from "veso";

const alpha = v.string().alpha();

alpha.validate("test"); // => true
alpha.validate("test123"); // => "The value must include only latin characters!"
```

Optionaly, you can pass in an additional argument to provide a custom error message.

- Added String `alphaNum` validator.

```ts
import { v } from "veso";

const alphaNum = v.string().alphaNum();

alphaNum.validate("test"); // => true
alphaNum.validate("test123"); // => true
alphaNum.validate("test12.3"); // => "The value must include only latin characters and numbers!"
```

Optionaly, you can pass in an additional argument to provide a custom error message.

- Added String `hex` validator.

```ts
import { v } from "veso";

const hex = v.string().hex();

hex.validate("ab03"); // => true
hex.validate("ffffff"); // => true
hex.validate("abct"); // => "The value must include only hex characters!"
```

Optionaly, you can pass in an additional argument to provide a custom error message.
