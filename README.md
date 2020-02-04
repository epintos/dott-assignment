## Description

Esteban Pintos' solution for dott's interview assignment.

## Instructions

1 - Install packages by running:

```bash
    npm install
```

2 - Execute tests, build and execute:

```bash
    npm run solve
```

or if you want to skip the tests and build:

```bash
    npm run start
```

This will leave the Standand Input listening to the user's input. Copy and Paste your examples and press Enter. You can find an example [here](./input-example.txt).

Once you press enter, the results will be printed in your terminal and the process will finish.

## TODOs and Improvements

- Test the main [Solver](./src/classes/solver.class.ts).
- Review TypeScript code style. It's my first TypeScript project so there might other best practices to implement.
- Separate the [Solver](./src/classes/solver.class.ts) and the `Parser` in different classes to simplify testing and allow the Solver to use a different type of Parsers (eg. from a txt file).
- Improve calculations complexity by using the BFS algorithm.