const test = require("ava");
const source = require("../source");

test("doStuff(true)", t => {
  t.is(source(true), false);
});

test("doStuff(1)", t => {
  t.is(source(1), 2);
});
