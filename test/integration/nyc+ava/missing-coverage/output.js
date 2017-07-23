const test = require("ava");
const path = require("path");
const reduce = require("lodash.reduce");
const run = require("test/integration/nyc+ava/helpers/run-ava");

const testDir = path.join(process.env.NODE_PATH, "support/missing-coverage");

const stats = {
  lines: { hit: 7, all: 8 },
  statements: { hit: 8, all: 10 },
  functions: { hit: 1, all: 2 },
  branches: { hit: 3, all: 4 },
};

let totals = reduce(stats, (sum, stat) => {
  return { hit: sum.hit + stat.hit, all: sum.all + stat.all };
}, { hit: 0, all: 0 });

test("calculates percentage", t => {
  let calculated = 100 * (totals.hit / totals.all);
  return run(testDir)
    .then(({ percentage }) => parseFloat(percentage, 10))
    .then(percentage => t.is(Math.floor(percentage), Math.floor(calculated)));
});

test("counts metrics", t => {
  return run(testDir)
    .then(({ counted }) => parseInt(counted, 10))
    .then(counted => t.is(counted, totals.all));
});

test("counts covered lines", t => {
  return run(testDir)
    .then(({ covered }) => parseInt(covered, 10))
    .then(covered => t.is(covered, totals.hit));
});
