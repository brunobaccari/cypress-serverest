# SERVEREST - TESTES AUTOMATIZADOS

Este projeto contém testes automatizados para a aplicação ServeRest, utilizando Cypress para testes E2E e de API.

## ✅ Pré-requisitos
- **Node.js**: 18.x ou superior
- **Gerenciador de pacotes**: npm

## 📁 Estrutura do Projeto
```text
- cypress:
  - e2e:
    - frontend:
      - login.cy.js
      - produtos.cy.js
      - usuarios.cy.js
    - api:
      - login.api.cy.js
      - produtos.api.cy.js
      - usuarios.api.cy.js
  - fixtures:
    - login.json
    - produto.json
    - usuario.json
  - results:
    - frontend:
      - login.frontend
      - produtos.frontend
      - usuarios.frontend
    - api:
      - login.api
      - produtos.api
      - usuarios.api
  - support:
    - commands.js
    - e2e.js
```

## ⚙️ Instalação
- Clone o repositório
```bash
git clone https://github.com/brunobaccari/cypress-serverest.git
```
Instale as dependências com o Gerenciador de pacotes
```bash
- npm install
```

## 📦 Dependências
- `cypress`: ^14.3.1

## 🧪 Scripts
- `cypress:open`: `npm run cy:open`
- `cypress:run`: `npm run cy:run`
- `test:frontend`: `npm run test:e2e`
- `test:api`: `npm run test:api`
