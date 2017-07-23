const test = require("ava");
require("../hits-all");
require("../miss-all");

test("runs", t => {
  return t.is(1, 1);
});
