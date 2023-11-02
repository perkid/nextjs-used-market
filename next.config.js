/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname:'res.cloudinary.com'
      },
      {
        protocol:'http',
        hostname:'res.cloudinary.com'
      },
      {
        protocol:'https',
        hostname:'via.placeholder.com'
      },
    ]
  }
}

module.exports = nextConfig
