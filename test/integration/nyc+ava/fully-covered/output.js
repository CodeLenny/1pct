const test = require("ava");
const path = require("path");
const run = require("test/integration/nyc+ava/helpers/run-ava");

const testDir = path.join(process.env.NODE_PATH, "support/fully-covered");

const lines = 3;
const statements = 4;
const functions = 1;
const branches = 2;
const metrics = lines + statements + functions + branches;

test("calculates percentage", t => {
  return run(testDir)
    .then(({ percentage }) => t.is(percentage, "100.00"));
});

test("counts metrics", t => {
  return run(testDir)
    .then(({ counted }) => parseInt(counted, 10))
    .then(counted => t.is(counted, metrics));
});

test("all counted lines are covered", t => {
  return run(testDir)
    .then(({ covered, counted }) => t.is(covered, counted));
});
