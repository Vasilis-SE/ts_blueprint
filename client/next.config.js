const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_PORT: process.env.NEXT_PUBLIC_API_PORT
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
}

module.exports = nextConfig