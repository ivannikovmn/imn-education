# IMN Education

An educational platform for publishing learning workshops and materials, registering participants, tracking attendance, and issuing participation certificates.

## MVP Features

- Educational workshop information pages
- Learning materials with external links, including YouTube
- User registration and authentication
- Workshop registration (applications)
- Participant and application management
- Attendance status tracking
- Certificate generation and public verification after attendance confirmation
- Email notifications with certificate links
- Admin and workshop management functionality
- Website traffic and user interaction analytics

## Project Structure

- `frontend` — client application built with Next.js and React
- `backend` — REST API built with Node.js and Express

## Setup

### Backend

```bash
cd backend
npm install
```

Create `.env` based on `.env.example` and configure the database connection and required environment variables.

Start PostgreSQL:

```bash
docker compose up -d
```

The PostgreSQL container listens on port `5435` on the host and uses port `5432` internally.

Run migrations:

```bash
npx sequelize-cli db:migrate
```

Run the initial role seed:

```bash
npx sequelize-cli db:seed --seed seedRole.js
```

### Frontend

```bash
cd frontend
npm install
```

## Development

### Run backend

```bash
cd backend
npm run dev
```

Backend development server: `http://localhost:3040`

### Run frontend

```bash
cd frontend
npm run dev
```

Frontend development server: `http://localhost:3041`

### Local URLs

- Frontend: `http://localhost:3041`
- Backend: `http://localhost:3040`

API routes use the `/api` prefix.

## Production

The application is deployed on an Ubuntu server and managed with PM2.

### Backend

The backend runs in production mode on port `3030`.

### Frontend

Build the application:

```bash
cd frontend
npm run build
```

The frontend runs in production mode on port `3031`.

### PM2 Processes

- `imn-education-backend`
- `imn-education-frontend`

### Production URLs

- Frontend: https://education.imn.kz
- Backend: https://education-backend.imn.kz

API routes use the `/api` prefix.

The domains are routed through Cloudflare Tunnel.

## Testing

### Frontend lint

```bash
cd frontend
npm run lint
```

### Frontend unit tests

Run unit tests with Vitest:

```bash
cd frontend
npm test
```

### Frontend E2E tests

Run E2E tests with Playwright:

```bash
cd frontend
npm run test:e2e
```

### Backend syntax check

```bash
cd backend
find . -path './node_modules' -prune -o -type f -name '*.js' -print0 | xargs -0 -n1 node --check
```

### API Testing

Postman collection:

- `imn-education.postman_collection.json`

## Documentation

### Database

The database schema is documented in the ER diagram:

[IMN Education Database - Figma](https://www.figma.com/board/iL3lnndn5mmghAxqUwkD5u/IMN-Education-Database)

The `Vacancies` table is currently reused for educational workshops. The `materials` JSONB field stores associated learning resources and external links.

Some legacy fields, including `event_date` and `address`, are retained in the database model for possible future offline or hybrid workshop functionality.

### Applications and Certificates

The existing application workflow is reused for workshop registration and attendance tracking.

A participant can register for a workshop. After participation is confirmed by an authorized user, the application status is changed to `ATTENDED`.

A certificate is available only for applications with the `ATTENDED` status. The certificate page is generated dynamically using existing database records, including participant information, workshop details, and application data.

Certificates are not stored as separate records in the database. An email notification containing the certificate link is sent as part of the application workflow.

## Background Processing and Shared Infrastructure

Redis and BullMQ are used for asynchronous email notifications.

IMN Education uses a dedicated BullMQ queue and email worker, keeping background job processing isolated from other applications hosted on the same infrastructure.

Email delivery is implemented with Nodemailer and Gmail SMTP. Failed jobs are retried automatically according to the configured BullMQ retry policy.

Redis is provided by the shared server infrastructure, while each application maintains its own queue and worker process.

## Continuous Integration and Deployment

The project uses GitHub Actions for continuous integration.

On pushes and pull requests targeting `main`, the CI pipeline runs:

- ESLint
- Vitest unit tests
- Playwright end-to-end tests
- Next.js production build

Production deployment is implemented using a self-hosted GitHub Actions runner on Ubuntu and PM2 process management.

The deployment architecture uses versioned releases and a shared directory for environment configuration and uploaded files. This keeps persistent application data separate from deployable code and allows releases to be switched independently.

## Stack

- Docker
- PostgreSQL
- Redis
- Node.js
- Express (REST API with CORS)
- Next.js
- React
- Redux Toolkit
- Axios
- Sequelize ORM
- Passport + JWT
- Nodemailer (Gmail SMTP)
- BullMQ
- Bcrypt
- Multer
- CKEditor 5
- Dotenv
- Nodemon + Morgan
- PM2
- GitHub Actions
- Vitest
- Playwright
- Google Analytics 4 (website traffic and user interaction analytics)
