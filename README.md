# Task Manager

Task Manager is a web application for managing tasks. It consists of two main parts:
- `client`: A React app for the front-end
- `server`: An Express app for the back-end

## Getting Started

These instructions will help you set up and run the application locally.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/)

### Cloning the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

## Running the Client

1. Navigate to the `client` folder:
    ```bash
    cd client
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm run start
    ```

The client will be running at `http://localhost:3000`.

## Running the Server

1. Navigate to the `server` folder:
    ```bash
    cd server
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the Express server:
    ```bash
    node .
    ```

The server will be running at `http://localhost:5000` (or the port specified in your environment variables).

## Configuration

Make sure to configure the environment variables to ensure the application runs properly. Create a `.env.local` file in `client` and `.env` file in  `server` directories with the necessary configuration. Below are example environment variables you might need:

### Client `.env.local`

```plaintext
REACT_APP_CLERK_PUBLISHABLE_KEY=
REACT_APP_ALGOLIA_APP_ID=
REACT_APP_ALGOLIA_SEARCH_API_KEY=
REACT_APP_SERVER_ENDPOINT=http://localhost:5000
```

### Server `.env`

```plaintext
MONGODB_URI=
PORT=5000
CLIENT_ORIGIN_ENDPOINT=http://localhost:3000
ALGOLIA_APP_ID=
ALGOLIA_ADMIN_API_KEY=
ALGOLIA_INDEX_NAME=tasks
CLERK_SECRET_KEY=
```