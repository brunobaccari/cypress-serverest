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
npm ci
npm run cy:open
```

| Comando | Execução |
| --- | --- |
| `npm run cy:run` | Todos os testes |
| `npm run test:e2e` | Testes de frontend |
| `npm run test:api` | Testes de API |

Cypress 14 executa com Node 24. Cada spec cria uma conta admin exclusiva; o login não depende mais de um usuário compartilhado. Fixtures permanecem como modelos dos cenários. Requisições da interface são aguardadas por rota, e as validações identificam o email ou produto criado. O teardown remove apenas IDs registrados; interrupções ou indisponibilidade da API podem impedir a limpeza.

Relatórios de API registram método, rota e status, sem tokens, senhas ou corpos de resposta. O Actions executa API e frontend separadamente, publica summaries e envia JUnit, JSON e vídeos como artifacts. Os outputs são ignorados pelo Git. A cobertura é do ambiente público de demonstração, sem validar autorização em produção ou desempenho.

O summary do Actions lista cada cenário, duração, totais e motivo de bloqueio. O gate exige a quantidade prevista no workflow, sem falhas ou skips; JUnit ausente ou inválido reprova. O resumo também acompanha o artifact.

Screenshots do estado final também são capturados nos testes de interface aprovados e ficam nos artifacts, fora do Git.
