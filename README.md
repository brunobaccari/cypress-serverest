# Cypress · Testes de frontend e API

[English version](README.en.md)

Automação em JavaScript para o [frontend do ServeRest](https://front.serverest.dev/) e sua [API](https://serverest.dev/).

## Organização

- `cypress/e2e/frontend`: login, usuários e produtos pela interface.
- `cypress/e2e/api`: autenticação e operações de usuários e produtos.
- `cypress/fixtures`: dados usados pelos cenários.
- `cypress/support`: comandos compartilhados e configuração de suporte.

## Executar

Com Node.js e npm instalados:

```sh
git clone https://github.com/brunobaccari/cypress-serverest.git
cd cypress-serverest
npm install
npm run cy:open
```

| Comando | Execução |
| --- | --- |
| `npm run cy:run` | Todos os testes |
| `npm run test:e2e` | Testes de frontend |
| `npm run test:api` | Testes de API |

O projeto usa Cypress 14. Revise as fixtures de login, usuário e produto antes de executar; os dados precisam corresponder ao ambiente público de demonstração. Não coloque credenciais pessoais nesses arquivos.

Screenshots são gravados em `cypress/results`; a gravação de vídeo está habilitada na configuração. O projeto mantém a implementação original, incluindo esperas fixas em alguns cenários. Os testes não foram reexecutados nesta revisão documental.
