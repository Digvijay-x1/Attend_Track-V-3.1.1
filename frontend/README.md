# Attend Track Frontend

This is the frontend for the Attend Track application, built with React and Vite.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory with the following content:
```
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

3. Run the development server:
```bash
npm run dev
```

## Google OAuth Setup

To enable Google login:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add your development URL (e.g., http://localhost:5173) to the Authorized JavaScript origins
7. Add your development URL with callback path (e.g., http://localhost:5173/auth/google/callback) to the Authorized redirect URIs
8. Click "Create" and copy the Client ID
9. Paste the Client ID into your `.env` file as the VITE_GOOGLE_CLIENT_ID value

## Features

- User authentication (Email/Password and Google OAuth)
- Attendance tracking
- Course management
- Dashboard with attendance statistics
- Responsive design

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
