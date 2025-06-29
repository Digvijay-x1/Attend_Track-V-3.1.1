import axios from 'axios';

/**
 * Verify Google OAuth token with Google's servers
 * @param {string} token - The ID token from Google
 * @returns {Promise<Object>} - The verified user data
 */
export const verifyGoogleToken = async (token) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Verify that the token was issued for our client ID
    if (response.data.aud !== process.env.CLIENT_ID) {
      throw new Error('Invalid client ID');
    }

    return response.data;
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Failed to verify Google token');
  }
};

/**
 * Get user info from Google using access token
 * @param {string} accessToken - The access token from Google
 * @returns {Promise<Object>} - The user data
 */
export const getGoogleUserInfo = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error getting Google user info:', error);
    throw new Error('Failed to get Google user info');
  }
}; 