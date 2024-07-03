# Changelog

## 1.0.0-alpha.10

- Fixed number `multipleOf` error messages parsing.

- Added check for negatives at string `numeric` method.

## Previous Releases

### 1.0.0-alpha.9

- All `required` methods now have primary priority when validating data.

- Fixed a bug when validating without `required` method.

### 1.0.0-alpha.8

- Change `coerce` functionality.

From now `coerce` more predictable on `""`, `undefined` and `null`. This values will be valid except `.required()` is used!

### 1.0.0-alpha.7

- Added `setMap` function to make custom errors more simple!

```ts
import { setMap } from "veso";

setMap({
  STRING: {
    required: "Required field!",
  },
});

setMap(null); // Reset map to default
```

**Note** - If there is no message in map, the default message will be returned!

- Added `VesoMap` type to define map for `setMap` function.

- Added `VesoTranslateFunction` type to define function for `setTranslate` function.

- Every message supports `{key}` params, except for translation using `setTranslate`! The parameter name is the same as in the validator method!

```ts
import { v, setMap } from "veso";

setMap({
  STRING: {
    minLength: "Min length - {minLength}",
  },
});

v.string().minLength(3).validate("hi"); // => "Min length - 3"
v.string().minLength(3, "{minLength} - is min length!").validate("hi"); // => "3 - is min length!"
```

- Updated Veso `translation order`:

  1. Message, passed in validator.
  2. Translation with `setTranslate`.
  3. Translation with `setMap`.
  4. Default error message.

### 1.0.0-alpha.6

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
