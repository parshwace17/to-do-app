# Todo App

This project is a Todo List REST API built using **Node.js**, **ExpressJS**, **Mongoose**, **MongoDB**, and **TypeScript**. It includes secure authentication, Swagger documentation, and CRON jobs for marking expired todo items as completed.

## Features

- CRUD operations for todo items.
- User authentication.
- Scheduled CRON jobs for automatic completion of expired todos.
- Swagger API documentation available at `/docs`.
- Built-in support for Docker for containerization.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18.x or higher)
- **npm** (Node Package Manager)
- **Docker** and **Docker Compose** (if running the project inside Docker)
- **MongoDB** (if not using Docker for MongoDB)

## Project Setup

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/parshwace17/to-do-app.git
cd todo-app
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Environment variables

Create a `.env` file in the root of your project and configure the following variables:

\`\`\`plaintext

# .env

PORT=3000

# MongoDB credentials

MONGO_USERNAME=root
MONGO_PASSWORD=root_password

# MongoDB connection URL

MONGODB_URL=mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:27017/todo_db?authSource=admin
JWT_SECRET=todouserapp

# Number of minutes after which an access token expires

JWT_ACCESS_EXPIRATION_MINUTES=30

\`\`\`

- `MONGODB_URL`: The MongoDB connection string.
- `JWT_SECRET`: A secret key for signing JWT tokens.
- `PORT`: The port the application will run on (default: 3000).

### 4. Build the project

Compile the TypeScript code into JavaScript:

\`\`\`bash
npm run build
\`\`\`

### 5. Running the app

#### Option 1: Run locally without Docker

The app uses PM2 for process management. PM2 ensures that the application runs smoothly and can handle restarts automatically in case of failure.

You can start the application directly with PM2:

\`\`\`bash
npm start
\`\`\`

This will start the app on the port specified in your `.env` file (default: `3000`).

You can access the Swagger documentation at `http://localhost:3000/v1/docs`.

This will start the app on the port specified in your .env file (default: 3000).

PM2 will run the app as a foreground process (using --no-daemon mode). This means the process will stay attached to your terminal session.
You can stop the application by pressing Ctrl+C or terminating the terminal session.
If you want to run PM2 in the background (daemon mode), you can remove the --no-daemon flag from the start script in your package.json.

To check the status of the app, you can use the PM2 command:

pm2 list

To stop the app:

pm2 stop all

#### Option 2: Run with Docker

If you want to run the app with Docker, use Docker Compose to build and start the services (including MongoDB).

1. Ensure Docker and Docker Compose are installed on your system.
2. Build and run the containers:

\`\`\`bash
npm run docker:prod
\`\`\`

This command will:

- Build the TypeScript code.
- Start the application and MongoDB inside Docker containers.

You can access the Swagger documentation at `http://localhost:3000/v1/docs`.

### 6. Accessing the API

Once the app is running, you can interact with the API via Swagger Postman, cURL, or any other HTTP client at `http://localhost:3000` (or the port specified in your `.env` file).

For example:

- `POST /auth/register`: Register new user.
- `POST /auth/login`: Login user
- `POST /auth/logout`: Logout to clear user sessions.
- `POST /auth/refresh-tokens`: Refresh authtokens as authtoken has less expiry time due to security purpose.

- `GET /todos`: Retrieve all todos.(authentication required).
- `POST /todos`: Create a new todo (authentication required).
- `GET /todos/:id`: Get individual todo read API (authentication required).
- `PATCH /todos/:id`: Update a todo (authentication required).
- `DELETE /todos/:id`: Delete a todo (authentication required).

## Additional Notes

- **Swagger Documentation**: You can view and interact with the API using Swagger documentation available at `/docs`.

- **MongoDB Password**: If you're using Docker, ensure that your `docker-compose.yml` defines the MongoDB username and password as environment variables, and update `MONGO_URI` in your `.env` accordingly.

- **CRON Jobs**: The CRON jobs are configured to automatically mark expired todos as completed at midnight every day. This is handled in a decoupled module using `node-cron`.
