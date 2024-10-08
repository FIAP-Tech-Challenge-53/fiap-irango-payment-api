# iRango Payment API
![typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![Node 20.10](https://shields.io/badge/Node-20.10.0-339933?logo=Node.js&logoColor=FFF&style=flat-square)
![nestjs](https://shields.io/badge/NestJS-E0234E?logo=NestJS&logoColor=FFF&style=flat-square)
![mysql](https://shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=FFF&style=flat-square)
![docker](https://shields.io/badge/Docker-2496ED?logo=Docker&logoColor=FFF&style=flat-square)
![swagger](https://shields.io/badge/Swagger-85EA2D?logo=Swagger&logoColor=FFF&style=flat-square)
![make](https://shields.io/badge/Make-00CC00?logo=Make&logoColor=FFF&style=flat-square)
![jest](https://shields.io/badge/Jest-C21325?logo=Jest&logoColor=FFF&style=flat-square)
![eslint](https://shields.io/badge/ESLint-4B32C3?logo=ESLint&logoColor=FFF&style=flat-square)
![editorconfig](https://shields.io/badge/EditorConfig-000000?logo=EditorConfig&logoColor=FFF&style=flat-square)
![typeorm](https://shields.io/badge/TypeORM-F37626?logo=TypeORM&logoColor=FFF&style=flat-square)

This project is a part of a fast food self-service system, proposed as a Tech Challenge for the Software Architecture Postgraduate Course at FIAP..

For this project, we utilized the [TypeScript](https://www.typescriptlang.org/) programming language with [Node.js](https://nodejs.org/) and the [Nest.js](https://nestjs.com/) framework. The database management includes [MySQL 5.7](https://www.mysql.com/) to handle information related to Pagamento.

To build the API documentation, we've used [Swagger](https://swagger.io/) tool integrated with Nest.js, accessible through the endpoint: {irango_host}/docs

## Workspace Dependencies
- [Node 20.10](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started/)
- Make
  - [Windows](https://gnuwin32.sourceforge.net/packages/make.htm)
  - Linux
  ```bash
  sudo apt update
  sudo apt install make
  ```

## Project Dependencies
Install project dependencies with:
```bash
npm run install
```

* Create a MongoDB database or start [fiap-irango-database/docker-compose.yml](https://github.com/FIAP-Tech-Challenge-53/fiap-irango-database/blob/main/docker-compose.yml) file.

* Start [fiap-irango-order-api](https://github.com/FIAP-Tech-Challenge-53/fiap-irango-order-api) service. It can be run after fiap-irango-payment-api starts.

## Start Project using Docker
Configure all docker containers and volumes and start the application
```bash
make setup

# or try without make

docker network create -d bridge local-network
cp .env.example .env
cp .env.local.test.example .env.test
docker compose build --progress=plain
docker compose up
docker compose exec -it irango-payment-api npm run migration:run
docker compose exec -it irango-payment-api npm run seed:run
```

## Start project using npm
Watch mode:
```bash
npm run start:dev
```

Compiled mode:
```bash
npm run build
npm run start
```

Migrations and Seeds:
```bash
npm run migration:run
npm run seed:run
```

## How to Use
We developed a seed to populate database with some products and one Consumidor with CPF `123.456.789-00`. You can use it or create a new Consumidor.

## Endpoints
We developed few endpoints which can be found in [pagamentos.controller.ts](./src/infra/web/nestjs/pagamentos/pagamentos.controller.ts), [pedidos.controller.ts](./src/infra/web/nestjs/pedidos/pedidos.controller.ts) files.

## Business Requirements:
1. Registrar novo pedido
> POST {irango_payment_host}/v1/pedidos/register
2. Webhook de Pagamento (Mercado Pago)
> POST {irango_payment_host}/v1/pagamentos/webhook/mercado-pago

## Automated Tests
### Unit Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:coverage
```

### Integration Tests
```bash
npm run test:integration
```

<img src="./docs/test_suite.png" alt="Test Suite Coverage" width="900" />

## OWasp Scan Reports

### Geração de Pagamento Vulnerabilities Report
- [Not Sanatized](https://fiap-tech-challenge-53.github.io/fiap-irango-payment-api/owasp-reports/vulnerabilities/gerar-pagamento/2024-08-17-ZAP-Report-.html)

- [Sanatized with False Positive](https://fiap-tech-challenge-53.github.io/fiap-irango-payment-api/owasp-reports/sanatized/gerar-pagamento/2024-08-17-ZAP-Report-.html)

### Confirmação de Pagamento Vulnerabilities Report

- [Not Sanatized](https://fiap-tech-challenge-53.github.io/fiap-irango-payment-api/owasp-reports/vulnerabilities/webhook/2024-08-17-ZAP-Report-.html)

- [Sanatized with False Positive](https://fiap-tech-challenge-53.github.io/fiap-irango-payment-api/owasp-reports/sanatized/webhook/2024-08-17-ZAP-Report-.html)


## Make commands
### Using Docker
- Setup Project: `make setup`. This command will create docker network, containers and volumes. It will also start the project and show its logs.
- Start Project: `make up`
- Stop Projects: `make down`
- Show logs: `make logs`
- Add Migration: `make migration.generate name=MigrationName`
- Run Migrations: `make migration.run`
- Add Seed: `make seed.generate name=SeedName`
- Run Seeds: `make seed.run`
- Access container bash: `make bash`
