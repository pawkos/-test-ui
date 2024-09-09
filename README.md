# Angular Landing Page with Authentication

This project is a simple landing page using the latest Angular with JWT registration and authentication. It uses standalone components, NgRx Store, TailwindCSS, and Material Design.

## Features

- Landing page displaying user login status
- JWT registration and authentication with email and password
- Navigation menu with login, logout, and register options
- Loading indicator and error handling
- NgRx Store for state management
- TailwindCSS for styling
- Material Design components

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a `src/environments/environment.ts` file with your API URL:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'https://localhost:3000'
   };
   ```
4. Run the development server:
   ```
   ng serve
   ```
5. Open your browser and navigate to `http://localhost:4200`