<p align="center">
  <h1 align="center">
    Veso
  </h1>
  <p align="center">
    <a href="https://www.npmjs.com/package/veso">
      https://www.npmjs.com/package/veso
    </a>
    <p align="center">
      Simple, lightweight and typesafe chain validator
    </p>
  </p>
</p>
<br/>

## Introduction

Veso is a typesafe chain validation library. The main goal of this library is to make a universal tool for easily checking data of any type.

Some great aspects:

- Zero dependencies
- Tiny
- Works with plain JavaScript
- Immutable
- Chainable interface

## Instalation

```sh
npm install veso       # npm
```

## Basic usage

Creating simple string validator.

```ts
import { v } from "veso";

// creating validator
const validator = v.string().minLength(4);

// validating
validator.validate("string"); // => true
validator.validate("str"); // => "The value must have more than or equal to 4 characters!"
validator.validate(321); // => false (with console error 'String Validator: Type of the value must be valid! Current type: number')
```

## Validators

```ts
import { v } from "veso";

// validators
v.string(); // => VesoString instance
v.number(); // => VesoNumber instance
v.array(); // => VesoArray instance
v.date(); // => VesoDate instance
```

**Important!** - Without .required() values **null** and **undefined** `are valid`!

## String Validator

```ts
// string validations
v.string().required();
v.string().minLength(number);
v.string().maxLength(number);
v.string().exactLength(number);
v.string().startsWith(string);
v.string().endsWith(string);
v.string().includes(string);
v.string().regex(regex);
v.string().ip(); // allows to validate IPv4 and IPv6 (default IPv4)
v.string().mac();
v.string().email();
v.string().url();
v.string().unique(number);
v.string().numeric();
v.string().alpha();
v.string().alphaNum();
v.string().hex();
v.string().notIn(string[]);
```

All validations support custom error message. You can pass in an additional argument to provide it.

```ts
// string validations
v.string().required({ message: "Is required!" });
v.string().minLength(5, { message: "Must be 5 or more characters long!" });
v.string().maxLength(5, { message: "Must be 5 or fewer characters long!" });
v.string().exactLength(5, { message: "Must be exactly 5 characters long!" });
v.string().startsWith("https://", { message: "Must provide secure URL!" });
v.string().endsWith(".ru", { message: "Only .ru domains allowed!" });
v.string().includes("veso", { message: "Must include veso!" });
v.string().regex(/\d/, { message: "Must contain at least one digit!" });
v.string().ip("v6", { message: "Invalid IP address!" });
v.string().mac({ message: "Invalid MAC!" });
v.string().email({ message: "Invalid email!" });
v.string().url({ message: "Invalid URL!" });
v.string().unique(3, { message: "Must include minimum 3 unique characters!" });
v.string().numeric({ message: "Must be a number!" });
v.string().alpha({ message: "Must include only letters!" });
v.string().alphaNum({ message: "Must include only letters and numbers!" });
v.string().hex({ message: "Must be hexadecimal!" });
v.string().notIn(["foo", "bar"], {
  message: "There shouldn't be 'foo' or 'bar'!",
});
```

### IP

The `v.string().ip()` method by default validate IPv4.

```ts
const ip = v.string().ip();

ip.validate("192.168.4.1"); // valid
ip.validate("192.168.4.341"); // invalid
ip.validate("a4d5:91a0:7114:1f55:41fa:f2d7:1212:f00b"); // invalid
ip.validate("a4d5:91a0:7114:1f55:41fa:f2d7:1212:gggg"); // invalid
```

You can set the `IPv6 version`.

```ts
const ip = v.string().ip("v6");

ip.validate("a4d5:91a0:7114:1f55:41fa:f2d7:1212:f00b"); // valid
ip.validate("a4d5:91a0:7114:1f55:41fa:f2d7:1212:gggg"); // invalid
ip.validate("192.168.4.1"); // invalid
ip.validate("192.168.4.341"); // invalid
```

### MAC

```ts
const mac = v.string().mac();

mac.validate("BC:00:00:01:FF:11"); // valid
mac.validate("00-1B-63-84-45-E6"); // valid
mac.validate("BC:00:00-01-FF:11"); // invalid
mac.validate("BC:00:00"); // invalid
```

### Email

```ts
const email = v.string().email();

email.validate("admin@admin.com"); // valid
email.validate("admin@admin.c"); // invalid
```

### URL

```ts
const url = v.string().url();

url.validate("http://test.c"); // valid
url.validate("https://test.c"); // valid
url.validate("ftp://test.c"); // valid
url.validate("htps://test.c"); // invalid
```

### Numeric

Validates negatives, integers and decimals.

```ts
import { v } from "veso";

const numeric = v.string().numeric();

numeric.validate("10.33"); // valid
numeric.validate("10."); // invalid
numeric.validate("notanumber"); // invalid
```

### Alpha

Validates only latin characters.

```ts
import { v } from "veso";

const alpha = v.string().alpha();

alpha.validate("test"); // valid
alpha.validate("test123"); // invalid
```

### AlphaNum

Validates latin characters and numbers.

```ts
import { v } from "veso";

const alphaNum = v.string().alpha();

alphaNum.validate("test"); // valid
alphaNum.validate("test123"); // valid
alphaNum.validate("test12.3"); // invalid
```

### Hex

Validates hexadecimal characters.

```ts
import { v } from "veso";

const hex = v.string().alpha();

hex.validate("ab03"); // valid
hex.validate("ffffff"); // valid
hex.validate("abct"); // invalid
```

## Number Validator

```ts
// number validations
v.number().required();
v.number().min(number); // >= number
v.number().max(number); // <= number
v.number().between(minNumber, maxNumber); // >= minNumber and <= maxNumber
v.number().positive(); // > 0
v.number().negative(); // < 0
v.number().nonpositive(); // <= 0
v.number().nonnegative(); // >= 0
v.number().multipleOf(number); // Evenly devisible by number. Can be used as "step"
v.number().safe(); // Value must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
v.number().integer(); // Value must be integer
v.number().notIn(number[]); // Value must not be in an array
```

Optionaly, you can pass in an additional argument to provide a custom error message.

## Array Validator

```ts
// array validations
v.array().required();
v.array().minLength(number); // >= number
v.array().maxLength(number); // <= number
v.array().exactLength(number); // === number
```

Optionaly, you can pass in an additional argument to provide a custom error message.

## Date Validator

```ts
// date validations
v.date().required();
v.date().min(Date); // >= Date
v.date().max(Date); // <= Date
v.date().between(minDate, maxDate); // >= minDate and <= maxDate
v.date().notIn(Date[]); // Value must not be in an array
```

Optionaly, you can pass in an additional argument to provide a custom error message.

## Validator settings

Every validator method has its own settings.

```ts
// Base settings
message?: string; // Setting for custom message
validateIf?: boolean | () => boolean; // Setting for optional validating with this method
```

## Coercion

Veso provides `coercion`. During the validation, the value is passing through JavaScript built-in functions for coercing data.

```ts
import { v } from "veso";

v.coerce.string(); // String(value)
v.coerce.number(); // => Number(value)
v.coerce.date(); // => new Date(value)
```

**Note** - values `""`, `undefined` and `null` are not coersing and will be valid without `.required()`.

## Translation of errors

### setTranslate

You can pass in `translation function` to make your custom errors without providing messages to every validator every single time.

```ts
import { setTranslate, VesoTranslateFunction } from "veso";

const myTranslateFn: VesoTranslateFunction = (key, settings) => {
  // Your translation logic
};

setTranslate(myTranslateFn);
```

The `key` is a constant value for each validator and the `settings` are the data you pass to the validator.

`VesoTranslateKey` - type for every posible key!

The best way to use this type of translation is with **i18n** library. You can pass the `t` function to `setTranslate` and thats it! It fully supports additional parameters to translation.

### setMap

You can pass in `translation map` to make your custom errors without providing messages to every validator every single time.

```ts
import { setMap, VesoMap } from "veso";

const myMap: VesoMap = {
  // Your translations
};

setMap(myMap);
```

### Translation order

1. Message, passed in validator.
2. Translation with `setTranslate`.
3. Translation with `setMap`.
4. Default error message.

## Changelog

View the changelog at [CHANGELOG.md](CHANGELOG.md)
