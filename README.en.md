# Cypress · Frontend and API tests

[Versão em português](README.md)

JavaScript automation for the [ServeRest frontend](https://front.serverest.dev/) and its [API](https://serverest.dev/).

## Structure

- `cypress/e2e/frontend`: login, users and products through the UI.
- `cypress/e2e/api`: authentication and user/product operations.
- `cypress/fixtures`: scenario data.
- `cypress/support`: shared commands and support configuration.

## Run

With Node.js and npm cied:

```sh
git clone https://github.com/brunobaccari/cypress-serverest.git
cd cypress-serverest
npm ci
npm run cy:open
```

| Command | Execution |
| --- | --- |
| `npm run cy:run` | All tests |
| `npm run test:e2e` | Frontend tests |
| `npm run test:api` | API tests |

Cypress 14 runs on Node 24. Each spec creates a unique admin account; login no longer relies on a shared demo user. Fixtures remain scenario templates. UI requests are awaited by route, and checks identify the exact created email or product. Teardown removes recorded IDs only; interrupted runs or API outages can prevent cleanup.

API reports record method, path and status without tokens, passwords or response bodies. Actions runs API and frontend separately, publishes their summaries, and uploads JUnit, JSON and videos as artifacts. Generated outputs are ignored by Git. This suite covers the public demo, not production access control or performance.

The Actions summary lists every scenario, duration, totals and blocking reason. The gate requires the count configured in the workflow, with no failures or skips; missing or invalid JUnit fails the gate. The summary is also included in the artifact.

Final-state screenshots are also captured for passing UI tests and stored in artifacts, outside Git.

Husky: with Node 24 and the stack dependencies installed, run `npm ci` to enable pre-commit. `npm run check:local` checks the diff, report gate and existing type/lint checks. The hook also rejects ignored files in the index. Browser, emulator and API tests remain in CI.
