# Node Authentication User

This project is a Node.js application that demonstrates user authentication using Express.js and a local database. It includes features such as user registration, login, and session management with cookies. The application uses Express.js for the server framework, a local database for storage, and JSON Web Tokens (JWT) for authentication.

## Preview

[Watch the demo](./assets/demo.mp4)

## Features

- **User Registration**: Allows new users to create an account.
- **User Login**: Enables existing users to log in.
- **Session Management**: Manages user sessions using cookies.
- **Password Hashing**: Secures user passwords by hashing them before storage.
- **Input Validation**: Validates user input to ensure data integrity.

## Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine.
- **db-local**: Set up and ensure the local database is ready for use.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gteixi/node-authentication-user.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd node-authentication-user
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```
   PORT=your_preferred_port
   JWT_SECRET=your_jwt_secret_key
   ```

   - Replace `your_preferred_port` with the port number you wish to use (e.g., 3000).
   - Replace `your_jwt_secret_key` with a secure secret key for JWT.

## Usage

1. **Start the application**:

   ```bash
   node —-run dev
   ```

   The server will start running at `http://localhost:PORT`, where `PORT` is the value specified in your `.env` file.

2. **Access the application**:

   - **Registration**: Navigate to `http://localhost:PORT/register` to create a new account.
   - **Login**: Navigate to `http://localhost:PORT/login` to log in with existing credentials.

## API Endpoints

- **POST /register**: Registers a new user.

  - Request body: `{ "username": "string", "password": "string" }`
  - Response: `{ "id": "user_id" }` or an error.

- **POST /login**: Authenticates a user and returns a JWT in an HTTP-only cookie.

  - Request body: `{ "username": "string", "password": "string" }`
  - Response: The user data or an error.

- **POST /logout**: Logs out the user by clearing the session cookie.

  - Response: `{ "message": "Sesión cerrada" }`.

- **GET /protected**: Returns a protected page only accessible to authenticated users.

  - Response: The user's session data if authenticated, or an access denied error.

- **GET /**: Displays the home page with user session data if authenticated.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **db-local**: Local database setup for development and data storage.
- **Mongoose**: Object Data Modeling (ODM) library for managing database interactions.
- **JSON Web Tokens (JWT)**: Secure user authentication using tokens.
- **bcryptjs**: Password hashing for enhanced security.
- **dotenv**: Management of environment variables.
- **zod**: Schema validation library for validating and parsing inputs.

## Acknowledgements

- This project was inspired by a node course from @midudev (www.midu.link/node).
- These resources provided valuable insights into implementing authentication in Node.js applications.
