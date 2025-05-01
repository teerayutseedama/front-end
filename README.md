# Redux Authentication App

A modern React application with Redux for state management, featuring a complete authentication system with login, registration, and user profile management.

## Features

- **Complete Authentication Flow**
  - User registration with validation
  - Login with secure token storage
  - Protected routes for authenticated users
  - Automatic session management
  - Secure logout functionality

- **Modern UI with Material UI**
  - Responsive design for all screen sizes
  - Clean, intuitive user interface
  - Form validation with helpful error messages
  - Loading indicators for async operations
  - Toast notifications for user feedback

- **State Management with Redux**
  - Centralized application state
  - Async operations with Redux Toolkit
  - Persistent authentication state
  - Optimized re-renders

- **Routing with React Router**
  - Protected routes for authenticated content
  - Clean URL structure
  - Programmatic navigation

## Tech Stack

- **Frontend**
  - React 19
  - Redux Toolkit
  - React Router v7
  - Material UI v7
  - Tailwind CSS v4
  - Axios for API requests
  - React Hot Toast for notifications

- **Development**
  - Vite for fast development and building
  - ESLint for code quality
  - Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/redux-auth-app.git
   cd redux-auth-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page components
├── reducers/           # Redux slices and reducers
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
├── store.js            # Redux store configuration
└── index.css           # Global styles
```

## Authentication Flow

1. **Registration**
   - User submits registration form with name, email, and password
   - Form validation ensures data integrity
   - On successful registration, user is redirected to login

2. **Login**
   - User provides email and password
   - On successful authentication, JWT token is stored
   - User is redirected to protected content

3. **Protected Routes**
   - Routes check authentication status
   - Unauthenticated users are redirected to login
   - Authenticated users can access protected content

4. **Logout**
   - User can logout from navbar or profile page
   - Token is removed and state is reset
   - User is redirected to login page

## API Integration

The application connects to a backend API for authentication. The API endpoints used are:

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user
- `GET /auth/profile` - Get the authenticated user's profile

## Customization

### Styling

The application uses Material UI for components and Tailwind CSS for utility classes. You can customize the theme in:

- Material UI theme: Create a theme provider in `src/theme.js`
- Tailwind: Modify the `tailwind.config.js` file

### API Endpoints

To change the API URL, modify the `API_URL` constant in `src/reducers/authSlice.js`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

