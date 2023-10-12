module.exports = {
    // Secret key for JWT (JSON Web Tokens) - Replace with a long, randomly generated secret
    JWT_SECRET: 'your_secret_key_here',

    // JWT expiration time (in seconds or as a string like '2h', '7d', etc.)
    JWT_EXPIRATION: '1h',

    // OAuth configuration if applicable
    OAUTH: {
        // OAuth provider details
        // For example, if you're using OAuth with a third-party provider, you can specify the client ID and client secret here.
        // Replace these with your actual OAuth credentials.
        CLIENT_ID: 'your_client_id',
        CLIENT_SECRET: 'your_client_secret',
        REDIRECT_URL: 'your_redirect_url',
    },
};
