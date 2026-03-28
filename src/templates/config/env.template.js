export const envTemplate = (answer) => `
PORT=3000
MONGO_URI=your_mongodb_uri

${answer.auth ? `ACCESS_TOKEN_SECRET=your_access_token
ACCESS_TOKEN_EXPIRY=2d

REFRESH_TOKEN_SECRET=your_refresh_token
REFRESH_TOKEN_EXPIRY=20d` : ""}

${answer.fileUpload ? `CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret` : ""}

CORS_ORIGIN=*
`;