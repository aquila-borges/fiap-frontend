# tech-challenge-1-app

## Description

This is a Next.js 15 app with a JSON Server backend used as a BFF (Backend For Frontend).  
The project uses React 19, TailwindCSS 4, and other modern tools to provide a frontend for managing transactions and bank accounts.

## Features

- Frontend with Next.js (React 19)
- Backend API mock with `json-server` serving data from `bff/db.json`
- Concurrent development of frontend and backend with `concurrently`
- Input components with currency formatting
- State management with React hooks
- API integration via fetch calls

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

#### Clone the repository:

git clone https://github.com/aquila-borges/fiap-frontend.git
cd fiap-frontend/tech-challenge-1-app

#### Install dependencies:

npm install

#### Running the project
###### Start both frontend and backend concurrently in development mode:

npm run dev

Frontend runs on: http://localhost:3000

JSON Server backend runs on: http://localhost:3001

#### Available scripts

- npm run dev: Runs frontend and backend concurrently

- npm run dev:next: Runs only the Next.js frontend with Turbopack

- npm run dev:bff: Runs only the JSON Server backend

- npm run build: Builds the Next.js app for production

- npm run start: Starts the Next.js app in production mode

- npm run lint: Runs ESLint on the codebase

#### Project Structure
/app: Next.js app folder (pages, components, API routes)

/bff: Contains db.json file for JSON Server mocking data

/core: Core domain files and DTOs

/infraestructure: Implementation details like repositories

### Dependencies

- React 19
- Next.js 15.3.2
- TailwindCSS 4
- json-server (mock backend)
- react-number-format (currency formatting)
- concurrently (run frontend and backend together)

### Notes
The backend is a simple mock server and does not persist data between restarts.

Customize the bff/db.json to change backend data.

Input components are customized to handle currency input formatting and validation.

### License
This project is private and not open source.
Used only for educational purposes.

### Author
Developed by aquila-borges