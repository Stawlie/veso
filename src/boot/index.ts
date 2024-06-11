import v from "../";

console.log(v.date().required().between(10, 1000).validate(new Date("433")));
