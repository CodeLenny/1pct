const fs = require("fs-extra");
const path = require("path");
const tmp = require("tmp-promise");
const { exec } = require("child-process-promise");
const either = require("ethr");

const pct = require.resolve("1pct");
const nyc = "node_modules/.bin/nyc";
const ava = "node_modules/.bin/ava";

function run(src) {
  const salt = Math.random().toString(36).slice(2);
  let cwd, testExec, output;
  return tmp
    .tmpName()
    .then(d => cwd = d)
    .then(() => fs.copy(src, cwd))
    .then(() => Promise.all([
      fs.ensureSymlink(path.join(process.env.NODE_PATH, "node_modules"), path.join(cwd, "node_modules")),
      fs.ensureSymlink(path.join(process.env.NODE_PATH, "support/package.json"), path.join(cwd, "package.json")),
      fs.ensureDir(path.join(cwd, "coverage")),
    ]))
    .then(() => {
      const report = "--reporter=text --reporter=json-summary";
      const files = `${cwd}/test/**`;
      testExec = `node ${nyc} ${report} ${ava} -v ${files}`;
      return exec(testExec, { cwd });
    })
    .then(() => exec(`node ${pct}`, { cwd }))
    .then(res => {
      const { stdout } = res;
      const [ , covered, counted ] = stdout.match(/Total coverage metrics: ([0-9]+)\/([0-9]+)/);
      output = Object.assign(res, {
        percentage: stdout.match(/Total coverage: ([0-9]{1,3}\.[0-9]{2})\%/)[1],
        covered,
        counted,
      });
    })
    .then(...either(() => fs.remove(cwd)))
    .then(() => output);
}

module.exports = run;
