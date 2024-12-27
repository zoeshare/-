/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 静态资源配置
  assetPrefix: '',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]',
        publicPath: '/'
      }
    });

    config.output = {
      ...config.output,
      publicPath: '/',
    };

    return config;
  },
  // 基础路径配置
  basePath: '',
  trailingSlash: true,
  // 禁用图片优化
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig 