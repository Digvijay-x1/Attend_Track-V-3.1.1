/*
Instructions for updating your Google OAuth configuration for Vercel deployment

1. Go to https://console.cloud.google.com/apis/credentials
2. Find and edit your OAuth client ID
3. Add these authorized JavaScript origins:
   - https://attendtrack-two.vercel.app (your production URL)
   - http://localhost:5173 (your development URL)

4. Add these authorized redirect URIs:
   - https://attendtrack-two.vercel.app (your production URL)
   - https://attendtrack-two.vercel.app/api/auth/google/callback (if you're using a specific callback path)
   - http://localhost:5173 (your development URL)
   - http://localhost:5173/api/auth/google/callback (if you're using a specific callback path)

5. Set these environment variables in your Vercel frontend project:
   - VITE_CLIENT_ID=your_google_oauth_client_id
   - VITE_BACKEND_URL=your_backend_url (e.g., https://attendtrack-api.vercel.app)

6. Set these environment variables in your Vercel backend project:
   - CLIENT_ID=your_google_oauth_client_id
   - CLIENT_SECRET=your_google_oauth_client_secret
   - FRONTEND_URL=https://attendtrack-two.vercel.app (exact production URL)
   - JWT_SECRET=your_jwt_secret_key
   - MONGODB_URI=your_mongodb_connection_string
   - NODE_ENV=production

7. After updating your Google Cloud Console settings, wait a few minutes for changes to propagate.
*/

console.log('Please follow the instructions in this file to properly configure your Google OAuth.'); 