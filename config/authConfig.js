module.exports = {
    // Secret key for JWT (JSON Web Tokens)
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key_here', // Use environment variable or a default value

    // JWT expiration time (in seconds or as a string like '2h', '7d', etc.)
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // Use environment variable or a default value

    // OAuth configuration if applicable
    OAUTH: {
        // OAuth provider details
        // For example, if you're using OAuth with a third-party provider, you can specify the client ID and client secret here.
        // Replace these with your actual OAuth credentials.
        CLIENT_ID: process.env.OAUTH_CLIENT_ID || 'your_client_id', // Use environment variable or a default value
        CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET || 'your_client_secret', // Use environment variable or a default value
        REDIRECT_URL: process.env.OAUTH_REDIRECT_URL || 'your_redirect_url', // Use environment variable or a default value
    },
};
