# Contributing to Taskboard

Thanks for helping out. A few things keep the board easy to work on.

## Getting set up

```bash
npm install
npm run dev
```

## Before you open a pull request

- Run `npm test` and make sure everything passes.
- Keep pull requests small: one change, one reason.
- Add or update a test when you change how tasks are grouped, sorted or moved.

## Writing style

- Name components after what they show (`EmptyColumn`, `TaskComments`).
- Prefer plain functions in `src/tasks.ts` for logic, so it can be tested without React.
