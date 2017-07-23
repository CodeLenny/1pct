# 1%: Summarize Istanbul Coverage

[![1% on NPM](https://img.shields.io/npm/v/@codelenny/1pct.svg)](npm.im/@codelenny/1pct)
[![Build Status](https://travis-ci.org/CodeLenny/1pct.svg?branch=master)](https://travis-ci.org/CodeLenny/1pct)

Running tests through Istanbul produces separate percentages for statements, branches, functions, and lines:

```sh
$(npm bin)/nyc (ava|mocha|...)
# ----------------------------|----------|----------|----------|----------|----------------|
# File                        |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
# ----------------------------|----------|----------|----------|----------|----------------|
# All files                   |    50.00 |        - |       -  |    90.00 |                |
# ...
# ----------------------------|----------|----------|----------|----------|----------------|
```

Use 1% to merge each coverage metric into a single percentage.  For instance, 2/4 statements (50% statement coverage)
and 9/10 lines (90% line coverage) would become 79% total coverage (calculated using `(2+9)/(4+10)`).

### Installation

```sh
npm install --save-dev @codelenny/1pct
```

### Usage

Run your tests normally:

```sh
# Generate JSON summary of coverage
$(npm bin)/nyc report --reporter=json-summary
# Run 1% to calculate total percentage
$(npm bin)/1%
# => Total Coverage 79%
```

```sh
$(npm bin)/nyc (ava|mocha|...)
# ----------------------------|----------|----------|----------|----------|----------------|
# File                        |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
# ----------------------------|----------|----------|----------|----------|----------------|
# All files                   |    50.00 |        - |       -  |    90.00 |                |
# ...
# ----------------------------|----------|----------|----------|----------|----------------|
```

Generate a JSON coverage summary for 1%:

```sh
$(npm bin)/nyc report --reporter=json-summary
```

Run 1% to summarize the total coverage:

```sh
$(npm bin)/1%
# statements: Covered 2 out of 4 total (50%)
# ...
# lines: Covered 9 out of 10 total (90%)
Total coverage metrics: 11/14
Total coverage: 78.57%
```

If you're using GitLab CI or another platform that extracts the coverage percentage from the log output, you can use the
following regular expression to filter the total coverage:

```regex
/Total coverage: ([0-9]{1,3}\.[0-9]{2})\%/
```
