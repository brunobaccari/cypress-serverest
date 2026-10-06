# Cypress · Frontend and API tests

[Versão em português](README.md)

JavaScript automation for the [ServeRest frontend](https://front.serverest.dev/) and its [API](https://serverest.dev/).

## Structure

- `cypress/e2e/frontend`: login, users and products through the UI.
- `cypress/e2e/api`: authentication and user/product operations.
- `cypress/fixtures`: scenario data.
- `cypress/support`: shared commands and support configuration.

## Run

With Node.js and npm installed:

```sh
git clone https://github.com/brunobaccari/cypress-serverest.git
cd cypress-serverest
npm install
npm run cy:open
```

| Command | Execution |
| --- | --- |
| `npm run cy:run` | All tests |
| `npm run test:e2e` | Frontend tests |
| `npm run test:api` | API tests |

This project uses Cypress 14. Review the login, user and product fixtures before running; their data must match the public demo environment. Do not put personal credentials in these files.

Screenshots are written to `cypress/results`; video recording is enabled in the configuration. The original implementation is preserved, including fixed waits in some scenarios. Tests were not rerun as part of this documentation review.
