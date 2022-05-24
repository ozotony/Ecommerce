/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async redirects() {
    return [
      {
        source: '/category',
        destination: '/',
        permanent: false,
      },
      {
        source: "/blog",
        destination:
          "https://blog.dundermifflin.com",
        permanent: true,
      },
    ];
  },
};


module.exports = nextConfig
