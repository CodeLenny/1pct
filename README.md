# 1%: Summarize Istanbul Coverage

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

```sh
# Install 1%
npm install --save-dev @codelenny/1pct
# Generate JSON summary of coverage
$(npm bin)/nyc report --reporter=json-summary
# Run 1% to calculate total percentage
$(npm bin)/1%
# => Total Coverage 79%
```
