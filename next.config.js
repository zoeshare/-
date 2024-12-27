/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.app'],
    unoptimized: true,
  },
  // 确保资源在正确的基础路径下
  basePath: '',
  assetPrefix: '',
  // 允许视频文件
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    return config;
  },
}

module.exports = nextConfig 