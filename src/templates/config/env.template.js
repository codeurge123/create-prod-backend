export const envTemplate = () => `
PORT=3000
MONGO_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_token
ACCESS_TOKEN_EXPIRY=2d

REFRESH_TOKEN_SECRET=your_refresh_token
REFRESH_TOKEN_EXPIRY=20d

CORS_ORIGIN=*
`;