module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/discover/popular',
        permanent: false,
      },
    ];
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_KEY: process.env.API_KEY,
  },
};
