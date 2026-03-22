# OpenTeam Backend

NestJS backend for OpenTeam. For frontend work, the source of truth for request and response shapes is the generated OpenAPI contract, not the ORM entities.

## API documentation

Start the backend and open:

- Swagger UI: `http://localhost:<PORT>/docs`
- OpenAPI JSON: `http://localhost:<PORT>/docs/openapi.json`

The exact base URL is printed by the bootstrap logger when the app starts.

## Quick start for frontend

If you only need the API docs and contracts, and do not want to run Postgres locally:

```bash
pnpm run start:docs
```

Then open:

- `http://localhost:29465/docs`

This mode uses an in-memory SQL.js database and is intended for local frontend work and contract inspection.

## Contract workflow

When adding or changing an endpoint:

1. Define the request DTO for `body`, `query`, or `params`.
2. Define a response DTO that matches the JSON returned to the frontend.
3. Annotate the controller with Swagger decorators so the contract stays generated from code.
4. Treat the OpenAPI JSON as the frontend-facing contract.

Current example:

- request DTO: [src/users/dto/create-user.dto.ts](/Users/olegtkach/IdeaProjects/OpenTeam/backend/src/users/dto/create-user.dto.ts)
- response DTO: [src/users/dto/user-response.dto.ts](/Users/olegtkach/IdeaProjects/OpenTeam/backend/src/users/dto/user-response.dto.ts)
- controller: [src/users/users.controller.ts](/Users/olegtkach/IdeaProjects/OpenTeam/backend/src/users/users.controller.ts)

## Setup

```bash
pnpm install
```

## Environment

Set the Postgres connection values in `backend/.env` before starting the app.

The backend prefers `DATABASE_*` keys from `backend/.env.example`, but also accepts legacy `DB_*` aliases:

- `DATABASE_URL` or `DB_URL`
- `DATABASE_HOST` or `DB_HOST`
- `DATABASE_PORT` or `DB_PORT`
- `DATABASE_USER` or `DB_USERNAME` or `DB_USER`
- `DATABASE_PASSWORD` or `DB_PASSWORD`
- `DATABASE_NAME` or `DB_NAME`
- `DATABASE_SSL` or `DB_SSL`

Set `PORT` if you want a fixed backend port.

## Run

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Tests

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```
