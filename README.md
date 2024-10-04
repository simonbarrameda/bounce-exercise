# Bounce Coding Assessment

Monorepo for frontend react application and node backend server for bounce coding assessment

## Starting the Application

This project uses docker and docker compose to start the services

```bash
docker compose up --build
```

## Project structure

```bash
.
├── nasa-app-backend/
│   ├── Dockerfile
│   └── ...
├── nasa-app-frontend/
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml
└── README.md
```

## Stopping the Application

To stop the running containers:

```bash
docker compose down
```