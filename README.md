# Thoq

## Project Overview

Thoq is a full-stack web application designed for efficient task management. It provides a robust backend API for handling user authentication and task operations, coupled with a modern, responsive frontend for an intuitive user experience. Users can register, log in, and manage their personal tasks.

## Technology Stack

### Frontend

- **Framework:** Next.js
- **Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management/Data Fetching:** React Query (`@tanstack/react-query`)
- **HTTP Client:** Axios
- **Authentication:** NextAuth.js
- **Schema Validation:** Zod

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv
- **CORS:** cors

## Description

Thoq aims to simplify daily task organization. The application features a secure authentication system, allowing users to maintain private task lists. The frontend, built with Next.js and React, offers a dynamic interface for creating, viewing, and managing tasks. The backend, powered by Node.js and Express.js, provides a RESTful API that interacts with a MongoDB database to store user and task data securely.

## Installation Instructions

To get Thoq up and running on your local machine, follow these steps:

### Prerequisites

- Node.js (LTS version recommended)
- pnpm (package manager)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/thoq.git
cd thoq
```

### 2. Backend Setup

Navigate to the `server` directory, install dependencies, and set up environment variables.

```bash
cd server
pnpm install
```

Create a `.env` file in the `server` directory with the following variables:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

- `PORT`: The port the server will run on (e.g., `5000`).
- `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/thoqdb` or your MongoDB Atlas URI).
- `JWT_SECRET`: A strong, random string for signing JWTs.

### 3. Frontend Setup

Navigate to the `client` directory, install dependencies, and set up environment variables.

```bash
cd ../client
pnpm install
```

Create a `.env.local` file in the `client` directory with the following variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

- `NEXTAUTH_URL`: The base URL of your Next.js application (e.g., `http://localhost:3000`).
- `NEXTAUTH_SECRET`: A strong, random string for NextAuth.js.
- `NEXT_PUBLIC_API_BASE_URL`: The base URL of your backend API (e.g., `http://localhost:5000/api`).

## Usage Examples

### Starting the Backend Server

From the `server` directory:

```bash
pnpm run dev
```

The server will start on the port specified in your `.env` file (default: `5000`).

### Starting the Frontend Application

From the `client` directory:

```bash
pnpm run dev
```

The client application will start on `http://localhost:3000`.

### Interacting with the Application

1.  Open your browser and navigate to `http://localhost:3000`.
2.  **Register:** Create a new user account.
3.  **Login:** Log in with your registered credentials.
4.  **Manage Tasks:** Once logged in, you can create new tasks, view your existing tasks, and interact with them.

## API Endpoints Documentation

The backend API provides the following endpoints:

### Authentication

- **`POST /api/auth/register`**
  - **Description:** Registers a new user.
  - **Request Body:** `{ "username": "string", "email": "string", "password": "string" }`
  - **Response:** `{ "message": "User registered successfully", "token": "string" }`
- **`POST /api/auth/login`**
  - **Description:** Authenticates a user and returns a JWT.
  - **Request Body:** `{ "email": "string", "password": "string" }`
  - **Response:** `{ "message": "Logged in successfully", "token": "string" }`

### Tasks (Requires Authentication)

- **`GET /api/tasks`**
  - **Description:** Retrieves all tasks for the authenticated user.
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `[ { "_id": "string", "title": "string", "description": "string", "completed": "boolean", "user": "string", "createdAt": "date", "updatedAt": "date" } ]`
- **`POST /api/tasks`**
  - **Description:** Creates a new task for the authenticated user.
  - **Headers:** `Authorization: Bearer <token>`
  - **Request Body:** `{ "title": "string", "description": "string" }`
  - **Response:** `{ "_id": "string", "title": "string", "description": "string", "completed": "boolean", "user": "string", "createdAt": "date", "updatedAt": "date" }`
- **`GET /api/tasks/:id`**
  - **Description:** Retrieves a single task by ID for the authenticated user.
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `{ "_id": "string", "title": "string", "description": "string", "completed": "boolean", "user": "string", "createdAt": "date", "updatedAt": "date" }`
- **`PUT /api/tasks/:id`**
  - **Description:** Updates an existing task by ID for the authenticated user.
  - **Headers:** `Authorization: Bearer <token>`
  - **Request Body:** `{ "title"?: "string", "description"?: "string", "completed"?: "boolean" }`
  - **Response:** `{ "_id": "string", "title": "string", "description": "string", "completed": "boolean", "user": "string", "createdAt": "date", "updatedAt": "date" }`
- **`DELETE /api/tasks/:id`**
  - **Description:** Deletes a task by ID for the authenticated user.
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:** `{ "message": "Task removed" }`

## Dependencies

### Client Dependencies

- `next`: React framework for production.
- `react`, `react-dom`: JavaScript library for building user interfaces.
- `@tanstack/react-query`: Powerful asynchronous state management for React.
- `axios`: Promise-based HTTP client.
- `next-auth`: Authentication for Next.js applications.
- `zod`: TypeScript-first schema declaration and validation library.

### Server Dependencies

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mongoose`: MongoDB object data modeling (ODM) for Node.js.
- `bcryptjs`: Library for hashing passwords.
- `jsonwebtoken`: Implementation of JSON Web Tokens for authentication.
- `dotenv`: Loads environment variables from a `.env` file.
- `cors`: Provides a Connect/Express middleware that can be used to enable CORS with various options.

## Contribution Guidelines

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the existing style and conventions.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (if applicable, otherwise state "No specific license file provided, assumed MIT").

## Future Improvements

- **Task Prioritization:** Allow users to set priority levels for tasks.
- **Task Categories/Tags:** Implement categorization or tagging for better organization.
- **Due Dates and Reminders:** Add functionality for setting due dates and receiving reminders.
- **User Profile Management:** Allow users to update their profile information.
- **Search and Filtering:** Enhance task retrieval with search and advanced filtering options.
- **Notifications:** Implement in-app or email notifications for task events.
- **Unit and Integration Tests:** Expand test coverage for both frontend and backend.
- **Deployment Automation:** Set up CI/CD pipelines for automated deployment.

## Project Structure

```
thoq/
├── client/                 # Next.js frontend application
│   ├── app/                # Next.js app router pages (login, register, main app)
│   ├── components/         # Reusable React components (e.g., TaskForm)
│   ├── lib/                # Client-side utilities (e.g., axios instance)
│   ├── providers/          # React context providers (e.g., QueryProvider)
│   └── types/              # Frontend TypeScript type definitions
└── server/                 # Node.js/Express.js backend API
    ├── src/
    │   ├── config/         # Database configuration (e.g., db.ts)
    │   ├── controllers/    # API logic handlers (e.g., authController, taskController)
    │   ├── middleware/     # Express middleware (e.g., authMiddleware)
    │   ├── models/         # Mongoose schemas/models (e.g., task, user)
    │   ├── routes/         # API route definitions (e.g., authRoutes, taskRoutes)
    │   └── index.ts        # Main server entry point
    └── .env                # Environment variables for the server
```
