## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/devs-codes/HRMS.git
    cd hrms/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URL, server port, and JWT secret key:
    ```
    MONGO_URL = "your_mongodb_url"
    PORT = your_server_port
    _SECRETJWT = "your_jwt_secret_key"
    ```

4. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### User Routes

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login a user
- `GET /api/user/get-user` - Get user details
- `PUT /api/user/update-user` - Update user details
- `DELETE /api/user/delete-user` - Delete a user

## File Descriptions

- **`.env`**: Environment variables file containing MongoDB URL, server port, and JWT secret key.
- **`.gitignore`**: Specifies files and directories to be ignored by Git.
- **`config/db.js`**: Contains the database connection logic.
- **`controllers/userController.js`**: Contains the logic for handling user-related requests.
- **`index.js`**: Entry point of the application. Sets up the Express server, connects to the database, and defines the routes.
- **`middlewares/`**: Directory for middleware functions (currently empty).
- **`models/`**: Contains Mongoose models for the application:
  - `attendance.js`: Model for attendance records.
  - `employee.js`: Model for employee records.
  - `leave.js`: Model for leave records.
  - `user.js`: Model for user records.
- **`package.json`**: Contains project metadata and dependencies.
- **`routes/userRoutes.js`**: Defines the routes for user-related API endpoints.

## License

This project is licensed under the MIT License.