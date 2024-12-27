/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['vercel.app'],
  },
  // 静态资源配置
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });

    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath = './';
    }

    return config;
  },
  // 基础路径配置
  basePath: '',
  trailingSlash: true,
}

module.exports = nextConfig 