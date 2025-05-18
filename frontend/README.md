# Ticketray Frontend

This is the frontend portion of the Ticketray application built with React.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```
   
   or if you use Yarn:
   ```
   yarn install
   ```

2. Start development server:
   ```
   npm start
   ```
   
   or with Yarn:
   ```
   yarn start
   ```

3. Build for production:
   ```
   npm run build
   ```
   
   or with Yarn:
   ```
   yarn build
   ```

## Project Structure

```
src/
├── assets/        # Static assets (images, fonts, etc.)
├── components/    # Reusable components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API services
├── styles/        # CSS/SCSS files
├── utils/         # Utility functions
├── App.js         # Main App component
└── index.js       # Entry point
```

## Connecting to Backend

The frontend will communicate with the Django backend API. Update the API base URL in the services/api.js file as needed.
