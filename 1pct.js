#!/usr/bin/env node
const path = require("path");
const numeral = require("numeral");
console.log(path.join(process.cwd(), "./coverage/coverage-summary.json"));
const { total } = require(path.join(process.cwd(), "./coverage/coverage-summary.json"));

let count = 0;
let covered = 0;

for(const category in total) {
  if(!total.hasOwnProperty(category)) { continue; }
  const { total: counted, covered: hit, pct } = total[category];
  console.log(`${category}: Covered ${hit} out of ${counted} total (${pct}%)`);
  count += counted;
  covered += hit;
}

const percent = numeral(covered / count).format("0.00%");

console.log(`Total coverage metrics: ${covered}/${count}`);
console.log(`Total coverage: ${percent}`);
